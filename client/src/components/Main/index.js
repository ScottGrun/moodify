import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import Header from './Header';

// Components
import PlaylistItemContainer from './PlaylistItemContainer';
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
        console.log(res.data);
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
