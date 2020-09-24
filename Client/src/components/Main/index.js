import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRecoilState } from 'recoil';
const { codeTokenState, accessTokenState } = require('../../state/atoms');

const Main = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ codeToken, setCodeToken ] = useRecoilState(codeTokenState);
  const [ accessToken, setAccessToken ] = useRecoilState(accessTokenState);

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
    setCodeToken(null);
    setAccessToken(null);
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