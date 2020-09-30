import React, { useEffect, useContext, useState } from 'react';
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
import OpenMenu from './OpenMenu';
import CreatePlaylistModal from './CreatePlaylistModal';

const MainContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 40px 1fr;
  gap: 24px 24px;
  grid-template-areas:
    'header header header header header header header header header header header header'
    'sidebar sidebar main main main main main main playlist-controls playlist-controls playlist-controls playlist-controls';
`;

const Sidebar = styled.div`
  margin-top: 20px;
  grid-area: sidebar;
`;

const MainContent = styled.div`
  margin-top: 20px;

  grid-area: main;
`;

const PlaylistControls = styled.div`
  margin-top: 20px;

  grid-area: playlist-controls;
`;

const HeaderContainer = styled.div`
    margin-bottom: 120px;
  grid-area: header;
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

  const getTracks = () => {
    axios
      .post(`http://localhost:9000/getTracks/`, {
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
    axios.post('http://localhost:9000/playlists/ids', { accessToken }).then((res) => {
      setPlaylists(res.data);
    });
  };

  useEffect(() => {
    getTracks();
    getPlaylists();
  }, []);

  return (
    <MainContainer openNav={openNav} openCYP={openCreatePlaylistModal}>
      <HeaderContainer>
      <Header />

      </HeaderContainer>

      <Sidebar>
        <Navigation playlists={playlists} />
      </Sidebar>
      <MainContent>
        <div className="playlists-container">
          <div className="playlist-image-container">
            <PlaylistImage />
          </div>
        </div>

        {userTracks.loading && <PlaylistItemContainer />}
      </MainContent>
      <PlaylistControls>
        <div className="playlist-customization-container">
          <div className="radar-chart-container">
            <RadarChart />
          </div>
          <div className="sliders-container">
            <Sliders />
            <button
              className="create-playlist-btn"
              onClick={() => setOpenCreatePlaylistModal(true)}
            >
              Create Playlist
            </button>
          </div>
          {/* <div className="presets-container">
            <PresetsContainer />
          </div> */}
        </div>
      </PlaylistControls>
    </MainContainer>
  );
};

export default Main;