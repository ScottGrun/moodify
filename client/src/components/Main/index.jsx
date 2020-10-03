import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { StateContext } from '../../App';
import { setSliderMarks } from '../../helpers/util';
import styled from 'styled-components';

// Components
import Header from './Header';
import Navigation from './Navigation.jsx';
import PlaylistImage from './PlaylistImage';
import PlaylistItemContainer from './PlaylistItemContainer';
import RadarChart from './RadarChart';
import Sliders from './Sliders';
import PresetsContainer from './PresetsContainer';
import OpenMenu from './OpenMenu';
import CreatePlaylistModal from './CreatePlaylistModal';
import SavePresetModal from './SavePresetModal';

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
  ${({ openPreset }) =>
    openPreset &&
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

  @media (max-width: 1280px) {
    margin: 24px;
    grid-template-areas:
      'header header header header header header header header header header header header'
      'main main main main main main main playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls';
  }

  @media (max-width: 768px) {
    margin: 16px;
    grid-template-areas:
      'header header header header header header header header header header header header'
      'playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls playlist-controls'
      'main main main main main main main main main main main main ';
  }

  @media(max-width: 375px){
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
    ${({ open }) => open &&`
      transform: translateX(0);
    `}
  }
`;

const MainContent = styled.div`
  grid-area: main;
`;

const PlaylistControls = styled.div`
  grid-area: playlist-controls;

  .presets-container {
    margin-top: 20px;
    border: 1px solid white;
    padding: 10px;
    border-radius: 4px;

    .title {
      display: flex;
      align-items: center;
      color: white;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-flow: row;
  }

  @media (max-width: 375px) {
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
  outline: none;

  &:hover {
    background-color: #2ed689;
    color: white;
  }
`;

const SavePresetButton = styled.button`
  width: 25%;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: solid 1px white;
  padding: 5px;
  cursor: pointer;
  outline: none;
  margin-left: 20px;

  &:hover {
    background-color: #2ed689;
  }

  &:active {
    outline: none;
  }
`;
    
const ControlsContainer = styled.div`
  width: 100%;

  @media (mix-max: 768px) {
    width: 50%;
  }
`;

const Main = () => {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useContext(StateContext).UserTracks;
  const [chartValues, setChartValues] = useContext(StateContext).ChartValues;
  const [openNav, setOpenNav] = useContext(StateContext).OpenNav;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useContext(
    StateContext,
  ).OpenCreatePlaylistModal;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [playlists, setPlaylists] = useState([]);
  const [openSavePresetModal, setOpenSavePresetModal] = useContext(StateContext).OpenSavePresetModal;
  const [marks, setMarks] = useState({});

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
        setSliderMarks(res.data.minMax, setMarks);
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

  return (
    <>
      <HamburgerMenu onClick={() => setOpenNav(!openNav)}>
        <OpenMenu />
      </HamburgerMenu>
      <Overlay
        openCYP={openCreatePlaylistModal || openNav}
        openPreset={openSavePresetModal}
        onClick={() => {
          setOpenNav(false);
          setOpenCreatePlaylistModal(false);
          setOpenSavePresetModal(false);
        }}
      ></Overlay>

      <MainContainer openNav={openNav}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <Sidebar open={openNav}>
          <Navigation playlists={playlists} marksState={[marks, setMarks]}/>
        </Sidebar>

        <MainContent>
          <CreatePlaylistModal />
          <SavePresetModal />

          <div className="playlists-container">
            <div className="playlist-image-container">
              <PlaylistImage />
            </div>
          </div>

        <PlaylistItemContainer />
        </MainContent>
        <PlaylistControls>
            <RadarChart />

          <ControlsContainer>
            <Sliders marksState={[marks, setMarks]}/>
            <CreatePlaylistButton
              onClick={() => setOpenCreatePlaylistModal(true)}
            >
              Create Playlist
            </CreatePlaylistButton>
          </ControlsContainer>

          <div className="presets-container">
            <div className='title'>
              <h3>Presets</h3>
              <SavePresetButton
                className="save-preset-btn" 
                onClick={() => setOpenSavePresetModal(true)}>
                  Save Preset
              </SavePresetButton>
            </div>
            <PresetsContainer /> 
          </div>
    
        </PlaylistControls>
      </MainContainer>
    </>
  );
};

export default Main;
