import React, { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';

const Main = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useContext(StateContext).AccessToken;

  const getTrack = () => {
    axios.post(`http://localhost:9000/data/track`, {
      accessToken
    })
    .then(res => {
      console.log(res.data);
    })
  };

  const logout = () => {
    removeCookie('accessToken');
    setAccessToken(null);
    window.location = 'http://localhost:3000';
  };

  return (
    <div>
      <h1>This is the Main Page.</h1>
      <button onClick={getTrack}>Get a track!</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Main;