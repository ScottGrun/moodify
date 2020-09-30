import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Landing from './components/Landing';
import Main from './components/Main';

export const StateContext = React.createContext();

export default function App() {
  
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useState(null);
  const [ chartData, setChartData ] = useState({});
  const [ chartValues, setChartValues ] = useState([0,0,0, 0,0,0]);
  const [ userTracks, setUserTracks ] = useState({ loading: false, songs: []});
  const [ openNav, setOpenNav ] = useState(false);
  const [ openCreatePlaylistModal, setOpenCreatePlaylistModal ] = useState(false);
  const [ playlistMinMax, setPlaylistMinMax ] = useState({data:{}, loaded: false});
  const [ filteredTracks, setFilteredTracks ] = useState([]);
  const [ openSavePresetModal, setOpenSavePresetModal ] = useState(false);

  if (cookies.accessToken && !accessToken) {
    setAccessToken(cookies.accessToken);
  }

  return (
    <StateContext.Provider value={ {
      AccessToken: [ accessToken, setAccessToken ],
      ChartData: [ chartData, setChartData ],
      ChartValues: [ chartValues, setChartValues ],
      UserTracks: [ userTracks, setUserTracks ],
      OpenNav: [ openNav, setOpenNav ],
      OpenCreatePlaylistModal: [ openCreatePlaylistModal, setOpenCreatePlaylistModal ],
      OpenSavePresetModal: [ openSavePresetModal, setOpenSavePresetModal ],
      PlaylistMinMax: [playlistMinMax, setPlaylistMinMax],
      FilteredTracks: [filteredTracks, setFilteredTracks]
    } }>
      { accessToken
        ? <Main />
        : <Landing />
      }
    </StateContext.Provider>
  );
}
