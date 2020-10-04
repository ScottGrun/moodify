import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import { setSliderMarks } from '../../helpers/util';
import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

// Components
import Header from './Header';
import Navigation from './Navigation.jsx';
import PlaylistImage from './PlaylistImage';
import PlaylistItemContainer from './PlaylistItemContainer';

import RadarChart from './RadarChart';
import Sliders from './Sliders';
import OpenMenu from './OpenMenu';
import CreatePlaylistModal from './CreatePlaylistModal';


const HamburgerMenu = styled.div`
  height: 24px;
  width: 24px;
  display: none;
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 99999;

  @media (max-width: 1280px) {
    display: block;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
  z-index: 999;
  ${({ openCYP }) =>
    openCYP &&
    `
    display: block;
  `}
`;

const MainContainer = styled.div`
  max-width: 1600px;
  margin: 24px auto 0 auto;
  position: relative;
  display: grid;
  overflow-x: hidden;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 40px 1fr;
  gap: 24px 24px;
  grid-template-areas:
    'header header header header header header header header header header header header'
    'sidebar sidebar main main main main main main playlist-controls playlist-controls playlist-controls playlist-controls';

  @media (max-width: 1280px) {
    margin: 24px;
    grid-template-areas:
      'header header header header header header header header header header header header'
      'main main main main main main main playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls';
  }

  @media (max-width: 800px) {
    margin: 16px;
    grid-template-areas:
      'header header header header header header header header header header header header'
      'playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls'
      'main main main main main main main main main main main main ';
  }

  @media (max-width: 450px) {
    grid-template-areas:
      'header header header header header header header header header header header header'
      'playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls '
      'main main main main main main main main main main main main ';
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;

  @media (max-width: 1280px) {
    grid-area: none;
    height: 100vh;
    width: 282px;
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    transform: translateX(282px);
    transition: all 0.5s ease-in-out;
    z-index: 1000;
    ${({ open }) =>
      open &&
      `
      transform: translateX(0);
    `}
  }
`;

const MainContent = styled.div`
  grid-area: main;
  display: flex;
  flex-flow: column;
`;

const PlaylistControls = styled.div`
  grid-area: playlist-controls;

  @media (max-width: 800px) {
    display: flex;
    flex-flow: row;
  }

  @media (max-width: 450px) {
    display: flex;
    flex-flow: column;
  }
`;

const HeaderContainer = styled.div`
  grid-area: header;
`;

const CreatePlaylistButton = styled.button`
  width: 100%;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: solid 2px white;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
        border-radius: 3px;
  &:hover {
    background-color: white;;
    color: #191F35;
  }
`;

const ControlsContainer = styled.div`
  width: 100%;

  @media (mix-max: 800px) {
    width: 50%;
  }
`;

const StyledSnackbar = styled(Snackbar)`
  .snackbar {
    height: 48px;
    min-width: 288px;
    color: white;
    font-size: 14px;
    letter-spacing: 0.2px;
    padding: 6px 24px;
    line-height: 1.43;
    border-radius: 4px;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    background-color: ${props => props.variant === 'success' ? '#4caf50' : '#f44336'};

    ion-icon {
      font-size: 22px;
      margin-right: 14px;
    }

    .login-again {
      display: flex;
      justify-content: flex-end;

      button {
        border: none;
        outline: none;
        border-radius: 4px;
        margin-left: 10px;
        padding: 4px;
        background-color: #272c34;
        color: white;
      }
    }
  }
`;

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const Main = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [loading, setLoading] = useState(false);
  const [userTracks, setTracks] = props.userTracks;
  const [chartValues, setChartValues] = props.chartValues;
  const [openNav, setOpenNav] = props.openNav;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = props.openCreatePlaylistModal;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({title:' Your Liked Songs', description: 'A collection of all the tracks you have ever liked on Spotify.', imgUrl: null})
  const [marks, setMarks] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: 'empty',
    variant: '',
  });

  const getSavedTracks = () => {
    axios.post(`http://localhost:9000/tracks/saved`, {
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
    })
    .catch(res => {
      setSnackbar({...snackbar, open: true, message: res.message});
    });
  };

  const getPlaylists = () => {
    axios.post('http://localhost:9000/playlists/ids', { accessToken }).then((res) => {
      setPlaylists(res.data);
      
    })
    .catch(res => {
      setSnackbar({...snackbar, open: true, message: res.message, variant: 'error'});
    });
  };

  const getSessionData = () => {
    setTracks(JSON.parse(localStorage.getItem('userTracks')));
    setChartValues(JSON.parse(localStorage.getItem('chartValues')));
    setPlaylistMinMax(JSON.parse(localStorage.getItem('playlistMinMax')));
    setPlaylists(JSON.parse(localStorage.getItem('playlists')));
    setMarks(JSON.parse(localStorage.getItem('marks')));

    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.getItem('userTracks')) {
      getSessionData();
      return;
    }
    getSavedTracks();
    getPlaylists();
  },[]);

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const login = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('userData');
    setAccessToken(null);

    localStorage.setItem('userTracks', JSON.stringify(userTracks));
    localStorage.setItem('chartValues', JSON.stringify(chartValues));
    localStorage.setItem('playlistMinMax', JSON.stringify(playlistMinMax));
    localStorage.setItem('playlists', JSON.stringify(playlists));
    localStorage.setItem('marks', JSON.stringify(marks));

    axios.get(`http://localhost:9000/auth/login`)
      .then(res => {
        window.location = res.data;
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <StyledSnackbar 
        key={ 'top' + 'center' }
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'center' 
        }}
        open={snackbar.open}
        onClose={closeSnackbar}
        autoHideDuration={5000}
        TransitionComponent={TransitionDown}
        variant={snackbar.variant}
      >
        <div className='snackbar'>
          {  
            snackbar.variant === 'success'
            ? <ion-icon name="checkmark-circle-outline"></ion-icon>
            : <ion-icon name="alert-circle-outline"></ion-icon>
          }
          {
            snackbar.message.includes('401')
            ? <div className='login-again'>
                <p>Your session ended</p>
                <button onClick={login}>Login</button>
              </div>
            : <p>{snackbar.message}</p>
          }
        </div>
      </StyledSnackbar>

      <HamburgerMenu onClick={() => setOpenNav(!openNav)}>
        <OpenMenu openNav={props.openNav} />
      </HamburgerMenu>

      <Overlay
        openCYP={openCreatePlaylistModal || openNav}
        onClick={() => {
          setOpenNav(false);
          setOpenCreatePlaylistModal(false);
        }}
      ></Overlay>

      <MainContainer openNav={openNav}>
        <HeaderContainer>
          <Header openNav={props.openNav} />
        </HeaderContainer>

        <Sidebar open={openNav}>
          <Navigation
            playlists={playlists}
            marksState={[marks, setMarks]}
            playlistMinMax={props.playlistMinMax}
            openNav={props.openNav}
            userTracks={props.userTracks}
            chartValues={props.chartValues}
            snackbar={[snackbar, setSnackbar]}
            setSelectedPlaylist={setSelectedPlaylist}
          />
        </Sidebar>

        <MainContent>
          <CreatePlaylistModal
            playlistMinMax={props.playlistMinMax}
            openCreatePlaylistModal={props.openCreatePlaylistModal}
            userTracks={props.userTracks}
            snackbar={[snackbar, setSnackbar]}
            getPlaylists={getPlaylists}
          />

          <div className="playlists-container">
            <div className="playlist-image-container">
              <PlaylistImage playlistMinMax={props.playlistMinMax} userTracks={props.userTracks} selectedPlaylist={selectedPlaylist} />
            </div>
          </div>
          <PlaylistItemContainer
            loading={[loading, setLoading]}
            playlistMinMax={props.playlistMinMax}
            userTracks={props.userTracks}
            chartValues={props.chartValues}
            snackbar={[snackbar, setSnackbar]}
          />
         
        </MainContent>
        <PlaylistControls>
          <RadarChart chartValues={props.chartValues} chartData={props.chartData} />

          <ControlsContainer>
            <Sliders
              marksState={[marks, setMarks]}
              playlistMinMax={props.playlistMinMax}
              userTracks={props.userTracks}
              chartValues={props.chartValues}
            />
            <CreatePlaylistButton onClick={() => setOpenCreatePlaylistModal(true)}>
              Create Playlist
            </CreatePlaylistButton>
          </ControlsContainer>
        </PlaylistControls>
      </MainContainer>
    </>
  );
};

export default Main;
