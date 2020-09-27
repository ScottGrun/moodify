import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import SpotifyWebApi from 'spotify-web-api-node';
import Header from './Header';

// Components
import PlaylistItemContainer from './PlaylistItemContainer';
<<<<<<< Updated upstream
const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useState({ loading: false, songs: [] });
=======
import RadarChart from './RadarChart';
import Sliders from './Sliders';
import PresetsContainer from './PresetsContainer';

const MainContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  .logout {
    position: fixed;
    top: 40px;
    right: 40px;
    width: 100px;
    height: 40px;

    &:hover {
      cursor: pointer;
    }
  }

  .main-content {
    width: 100%;
    max-width: 1440px;
    margin-top: 80px;
    display: flex;
    justify-content: center;

    .playlists-container {
      width: 100%;
      max-width: 684px;
      margin: 15px 30px;

      .playlist-image-container {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .playlist-customization-container {
      color: white;
      width: 100%;
      margin: 0 30px;

      .radar-chart-container {
        width: 100%;
      }

      .sliders-container {
        width: 100%;

        .create-playlist-btn {
          width: 100%;
          border: 2px solid white;
          font-size: 14px;
          letter-spacing: 0.2px;
          height: 40px;
          background-color: transparent;
          color: white;
          border-radius: 4px;
          font-weight: 600;
          margin-top: 20px;
          transition: 0.1s all ease-in-out;

          &:hover {
            cursor: pointer;
            background-color: #2ED689;
          }
        }
      }

      .presets-container {
        width: 100%;
        margin: 45px 0 30px 0;
      }
    }
  }

  @media(max-width: 1300px) {
    .main-content {

      .playlists-container {
        width: 50%;

        .playlist-image-container {

        }
      }

      .playlist-customization-container {
        width: 50%;

        .radar-chart-container {

        }

        .sliders-container {

        }

        .create-playlist-btn {

        }

        .presets-container {

        }
      }
    }
  }

  @media(max-width: 1226px) {
    .main-content {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      max-width: 700px;

      .playlists-container {
        width: 100%;
>>>>>>> Stashed changes

  const parseSongs = (songList) => {
    const songs = songList.map((song) => ({
      name: song.track.name,
      id: song.track.id,
      artist: song.track.artists[0].name,
      img: song.track.album.images[2].url,
    }));
    return songs;
  };

  const parseAudioFeatures = (songList) => {
    const songsWithAudioFeatures = songList.map((song) => song.id);
    return songsWithAudioFeatures;
  };
  const allSongs = [];



  useEffect(() => {
    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
      clientId: '0308728f27674395b181e8b7680b9e04',
      clientSecret: '952434dcc1c14fbfbe00af6ac6d5edd7',
      redirectUri: 'http://localhost:3000/',
    });

    spotifyApi.setAccessToken(
      'BQAyYHEliY3-Rx0fpFuaE_bfahecV_bsH0uvFrnDrPWZrQ9rj4hZocdMcjeTa5oph_BcT4hlFLXfrn86GhskUNs3LuQy-x3Xz3aRrGLnJ_LxBx7bwurkc-hdmFVj34bUEjjATcE4tQmfQtm49mHp1G88l62ZRliUTR36FmDOaOOChG-cllchtPRcSoSr149hm7o_pMDRnoR9uuKQCGBEe806kXDdNBe0YJpO-ti7KtyMKJxpVQ',
    );
    let totalSongs = 0;
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 1,
      })
      .then(
        function (data) {
          console.log('Done!');
          totalSongs = data.body.total;
          allSongs.push(...parseSongs(data.body.items));
          for (let i = 1; i * 50 <= totalSongs; i++) {
            spotifyApi
              .getMySavedTracks({
                limit: 50,
                offset: i * 50,
              })
              .then(
                function (data) {
                  console.log('Done!');
                  allSongs.push(...parseSongs(data.body.items));
                },
                function (err) {
                  console.log('Something went wrong!', err);
                },
              );
          }
          console.log('test');
        },
        function (err) {
          console.log('Something went wrong!', err);
        },
      )
      .then(() => {
        setTracks(prev => ({...prev, songs: allSongs}));

        setTimeout(()=>{
          setTracks(prev => ({loading:true, songs: allSongs}));

        }, 2000)
      });
  }, []);

  const getTrack = () => {
    axios
      .post(`http://localhost:9000/data/track`, {
        accessToken,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const logout = () => {
    removeCookie('accessToken');
    setAccessToken(null);
    window.location = 'http://localhost:3000';
  };

  return (
    <div>
      <Header />
      <h1>This is the Main Page.</h1>
      <button onClick={getTrack}>Get a track!</button>
      <button onClick={logout}>Logout</button>
      {userTracks.loading && <PlaylistItemContainer songs={userTracks.songs} />}
    </div>
  );
};

export default Main;
