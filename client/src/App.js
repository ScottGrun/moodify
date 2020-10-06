import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Landing from './components/Landing';
import Main from './components/Main/index';

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
  const [ songsInView, setSongsInView ] = useState(15);

  if (cookies.MoodifyAccessToken && !accessToken) {
    setAccessToken(cookies.MoodifyAccessToken);
  }

  return (
    <StateContext.Provider value={ {
      AccessToken: [ accessToken, setAccessToken ],
      SongsInView: [ songsInView, setSongsInView ],
    } }>
      { accessToken
        ? <Main 
            playlistMinMax={[ playlistMinMax, setPlaylistMinMax ]}
            openCreatePlaylistModal={[ openCreatePlaylistModal, setOpenCreatePlaylistModal ]}
            openNav={[ openNav, setOpenNav ]}
            userTracks={[ userTracks, setUserTracks ]}
            chartValues={[ chartValues, setChartValues ]}
            chartData={[ chartData, setChartData ]}
          />
        : <Landing />
      }
    </StateContext.Provider>
  );
}
