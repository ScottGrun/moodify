import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { StateContext } from '../../App';
import styled from 'styled-components';

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

  @media(max-width: 1280px) {
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
  max-width: 1440px;
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

  @media(max-width: 1280px){
    grid-template-areas:
    'header header header header header header header header header header header header'
    'main main main main main main main playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls';
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;

  @media(max-width: 1280px){
    grid-area: none;
    height: 100vh;
    width: 282px;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
  }
`;

const MainContent = styled.div`
  grid-area: main;
`;

const PlaylistControls = styled.div`
  grid-area: playlist-controls;

  
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

  &:hover {
    background-color: #2ed689;
    color: #191f35;
  }
`;

const Main = () => {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useContext(StateContext).UserTracks;
  const [chartValues, setChartValues] = useContext(StateContext).ChartValues;
  const [openNav, setOpenNav] = useContext(StateContext).OpenNav;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useContext(StateContext).OpenCreatePlaylistModal;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [playlists, setPlaylists] = useState([]);

  const getSavedTracks = () => {
    axios
      .post(`http://localhost:9000/tracks/saved`, {
        accessToken,
      })
      .then((res) => {
        setTracks({
          loading: true,
          songs: res.data.songs,
        });
        setChartValues(res.data.averages);
        setPlaylistMinMax({ data: res.data.minMax, loaded: true });
      });
  };

  const getPlaylists = () => {
    axios.post('http://localhost:9000/playlists/ids', { accessToken })
    .then((res) => {
      setPlaylists(res.data);
    });
  };

  useEffect(() => {
    getSavedTracks();
    getPlaylists();
  }, []);

  const handleClick = () => {
    console.log('sdfsdfsdfsd');
    setOpenNav(!openNav);
  }

  return (
    <>
      <HamburgerMenu onClick={handleClick}> 
        <OpenMenu />
      </HamburgerMenu>
      <Overlay
        openCYP={openCreatePlaylistModal}
        onClick={() => {
          setOpenNav(false);
          setOpenCreatePlaylistModal(false);
        }}
      ></Overlay>

      <MainContainer openNav={openNav}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <Sidebar>
          <Navigation playlists={playlists} open={openNav}/>
        </Sidebar>

        <MainContent>
          <CreatePlaylistModal />

          <div className="playlists-container">
            <div className="playlist-image-container">
              <PlaylistImage />
            </div>
          </div>

          {userTracks.loading && <PlaylistItemContainer />}
        </MainContent>
        <PlaylistControls>
          <div className="radar-chart-container">
            <RadarChart />
          </div>

          <div className="sliders-container">
            <Sliders />
            <CreatePlaylistButton
              className="create-playlist-btn"
              onClick={() => setOpenCreatePlaylistModal(true)}
            >
              Create Playlist
            </CreatePlaylistButton>
          </div>
        </PlaylistControls>
      </MainContainer>
    </>
  );
};

export default Main;
