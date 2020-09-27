import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import styled from 'styled-components';

// Components
import Header from './Header';
import Navigation from './Navigation';
import PlaylistImage from './PlaylistImage';
import PlaylistItemContainer from './PlaylistItemContainer';
import RadarChart from './RadarChart';
import Sliders from './Sliders';
import PresetsContainer from './PresetsContainer';

const MainContainer = styled.div`
  position: relative;
  height: 100%:
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

      .radar-chart-container {

      }

      .sliders-container {
        height: 400px;
        width: 400px;
      }

      .create-playlist-btn {
        width: 100%;
        margin-top: 60px;
        border: 2px solid white;
        font-size: 14px;
        letter-spacing: 0.2px;
        height: 40px;
        background-color: transparent;
        color: white;
        border-radius: 4px;
        font-weight: 600;
      }

      .presets-container {
        width: 100%;
        margin-top: 45px;
      }
    }
  }
`;

const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useState({ loading: false, songs: [] });

  const getTrack = () => {
    axios
      .post(`http://localhost:9000/getTracks`, {
        accessToken,
      })
      .then((res) => {
        setTracks({ loading: true, songs: res.data });
      });
  };

  useEffect(() => {
    getTrack();
  }, []);

  const logout = () => {
    removeCookie('accessToken');
    setAccessToken(null);
    window.location = 'http://localhost:3000';
  };

  return (
    <MainContainer>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <Header />
      <div className="main-content">
        <Navigation />

        <div className="playlists-container">
          <div className="playlist-image-container">
            <PlaylistImage />
          </div>
          {userTracks.loading && <PlaylistItemContainer songs={userTracks.songs} />}
        </div>

        <div className="playlist-customization-container">
          <div className="radar-chart-container">
            <RadarChart />
          </div>
          <div className="sliders-container">
            <Sliders />
          </div>
          <button className="create-playlist-btn">Create Playlist</button>
          <div className="presets-container">
            <PresetsContainer />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Main;
