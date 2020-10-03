import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { StateContext } from '../../App';
import { filterTracks } from '../../helpers/filter';
import { setSliderMarks } from '../../helpers/util';
// components
import Profile from './Profile';

// images
import musicIcon from '../../assets/music-icon.svg';
import trending from '../../assets/icons/trending.svg';
import albums from '../../assets/icons/test.svg';

const NavigationContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
  border-radius: 4px;

  .scroll {
    height: 100%;
    overflow-y: auto;
  }

  .my-playlists {
    margin-top: 20px;
  }

  .navigation-content {
    height: 100%;
    min-width: 217px;
    max-width: 217px;
    color: white;
    padding: 20px 10px 20px 10px;
    z-index: 2;

    .section {
      margin-bottom: 20px;

      .title {
        margin-bottom: 25px;
        font-size: 18px;
        letter-spacing: -0.2px;
        user-select: none;
      }

      ul {
        li {
          transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
          transition: all .2s;
          
          padding: 10px 5px;
          list-style: none;
          font-size: 14px;
          letter-spacing: 0.28px;
          display: flex;
          cursor: pointer;
          user-select: none;
          color: #C6C7CC;

          img {
            margin-right: 25px;
            width: 20px;
            height: 20px;
          }

          &:hover {
            background-color: #111423;
            color: white;
          }
        }
      }
    }

    .profile-dropdown-container {
      display: none;
    }
  }

  @media (max-width: 1300px) {
    min-width: 282px;
    max-width: 282px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;

    .navigation-content {
      min-width: 299px;
      max-width: 299px;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: #1c1d20;
      position: relative;

      .discover-container {
        margin-top: 7px;
      }

      .header {
        display: flex;
      }

      .profile-container {
        display: block;
        height: 40px;
        width: 100%;
        margin-bottom: 50px;
      }
    }
  }
`;

export default function Navigation(props) {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [openNav, setOpenNav] = props.openNav;
  const [chartValues, setChartValues] = props.chartValues;
  const [userTracks, setTracks] = props.userTracks;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [marks, setMarks] = props.marksState;
  const [snackBarMessage, setSnackBarMessage] = props.snackBarMessage;

  const loadTracks = (playlist_id, totalTracks) => {
    setOpenNav(false);
    axios
      .post(`http://localhost:9000/tracks/playlist`, {
        accessToken,
        playlist_id,
        totalTracks,
      })
      .then((res) => {
        setTracks({
          loading: true,
          songs: res.data.songs,
        });
        setChartValues(res.data.averages);
        setPlaylistMinMax({ data: res.data.minMax, loaded: true });
        setSliderMarks(res.data.minMax, setMarks);
      });
  };

  const loadFeaturedSongs = () => {
    setOpenNav(false);
    axios
      .post(`http://localhost:9000/tracks/featured`, {
        accessToken,
      })
      .then((res) => {
        setTracks({
          loading: true,
          songs: res.data.songs,
        });
        setChartValues(res.data.averages);
        setPlaylistMinMax({ data: res.data.minMax, loaded: true });
        setSliderMarks(res.data.minMax, setMarks);
      });
  };

  const loadRecommendedSongs = () => {
    setOpenNav(false);
    let recommendationSeeds = filterTracks(userTracks, playlistMinMax).map((track) => ({
      track_id: track.id,
      artist_id: track.artist_id,
    }));

    axios.post(`http://localhost:9000/tracks/recommendations`, {
      accessToken,
      recommendationSeeds,
      playlistMinMax,
    })
    .then((res) => {
      setTracks({
        loading: true,
        songs: res.data.songs,
      });
      setChartValues(res.data.averages);
      setPlaylistMinMax({ data: res.data.minMax, loaded: true });
      setSliderMarks(res.data.minMax, setMarks);
    })
    .catch(err => console.log(err));
  };

  const handlePlaylistClick = (playlistId, trackTotal) => {
    loadTracks(playlistId, trackTotal);
  };

  return (
    <NavigationContainer>
      <div className="navigation-content">
        <div className="section discover-container">
          <h3 className="title">Discover</h3>
          <ul className="playlists">
            <li onClick={loadFeaturedSongs}>
              <img src={trending} />
              <p>Featured Songs</p>
            </li>
            <li onClick={loadRecommendedSongs}>
              <img src={albums} />
              <p>Recommended</p>
            </li>
          </ul>
        </div>
        <h3 className="title">My Playlists</h3>

        <div className="section scroll my-playlists">
          <ul className="playlists">
            {props.playlists.length > 0 &&
              props.playlists.map((playlist) => {
                return (
                  <li
                    key={playlist.id}
                    onClick={() => handlePlaylistClick(playlist.id, playlist.tracks.total)}
                  >
                    <img src={musicIcon} />
                    <p>
                      {playlist.name.length > 17
                        ? playlist.name.slice(0, 17) + '...'
                        : playlist.name}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="profile-container">
          <Profile />
        </div>
      </div>
    </NavigationContainer>
  );
}
