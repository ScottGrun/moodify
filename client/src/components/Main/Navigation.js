import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { StateContext } from '../../App';

// components
import Profile from './Profile';

// images
import musicIcon from '../../assets/music-icon.svg';
import logo from '../../assets/logo.svg';
import leftArrow from '../../assets/left-arrow.svg';

const NavigationContainer = styled.div`
  height: 100vh;
  min-width: 200px;
  max-width: 200px;
  color: white;
  padding: 20px 10px;
  z-index: 2;
  overflow-y: auto;

  .header {
    display: none;
    margin-bottom: 30px;
    justify-content: space-between;
  }

  .my-playlists {
    margin-bottom: 20px;

    .title {
      margin-bottom: 25px;
      font-size: 18px;
      letter-spacing: -0.2px;
    }

    ul {

      li {
        padding: 10px;
        list-style: none;
        font-size: 14px;
        letter-spacing: 0.28px;
        display: flex;
        cursor: pointer;

        img {
          margin-right: 25px;
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: #ccc;
          color: #666666;
        }
      }
    }
  }

  @media(max-width: 1300px) {
    min-width: 282px;
    max-width: 282px;
    background-color: #1C1D20;
    position: fixed;
    top: 0;
    right: -280px;
    z-index: 100;
    transition: all 0.5s ease-in-out;
    ${({ open }) => open && `
      transform: translateX(-282px);
    `}

    .header {
      display: flex;
    }

    .profile-dropdown-container {
      display: block;
    }
  }
`;

export default function Navigation({ playlists }) {
  const [ openNav, setOpenNav ] = useContext(StateContext).OpenNav;
  const [ accessToken, setAccessToken ] = useContext(StateContext).AccessToken;
  const [ chartValues, setChartValues ] = useContext(StateContext).ChartValues;
  const [ userTracks, setTracks ] = useContext(StateContext).UserTracks;
  const [ playlistMinMax, setPlaylistMinMax ] = useContext(StateContext).PlaylistMinMax;

  const loadTracks = (playlist_id, totalTracks) => {
    axios
      .post(`http://localhost:9000/getTracks/playlist`, {
        accessToken,
        playlist_id,
        totalTracks
      })
      .then(res => {
        setTracks({
          loading: true,
          songs: res.data.songs,
        });
        setChartValues(res.data.averages);
        setPlaylistMinMax({data: res.data.minMax, loaded: true});
      });
  };

  return(
    <NavigationContainer open={openNav}>
      <div className='header'>
        <img src={logo} className='logo'/>
      </div>
      <div className='section my-playlists'>
        <h3 className='title'>My Playlists</h3>
        <ul className='playlists'>
          {
            playlists.length > 0 && playlists.map(playlist => {
              return (
                <li key={playlist.id} onClick={() => loadTracks(playlist.id, playlist.tracks.total)}>
                  <img src={musicIcon} /><p>{playlist.name}</p>
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className='profile-dropdown-container'>
        <Profile />
      </div>

    </NavigationContainer>
  );
};