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
<<<<<<< HEAD
import RadarChart from './RadarChart';
import Sliders from './Sliders';
import PresetsContainer from './PresetsContainer';
=======
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
>>>>>>> component/presets-image-library

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

        .playlist-image-container {
          display: none;
        }
      }

      .playlist-customization-container {
        width: 100%;
        height: 420px;
        display: grid;
        grid-template-columns: 46% 46%;
        grid-template-rows: 20% 20% 20% 20% 20%;
        justify-content: space-around;
        align-items: flex-start;

        .radar-chart-container {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 4;
        }

        .sliders-container {
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 5;

          .create-playlist-btn {
            align-self: flex-start;
          }
        }

        .presets-container {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 4;
          grid-row-end: 5;
          margin: 0;
          height: 100%;
        }
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

  const toggleMenu = () => {
    
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
            <button className='create-playlist-btn'>Create Playlist</button>
          </div>
          <div className="presets-container">
            <PresetsContainer />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Main;
