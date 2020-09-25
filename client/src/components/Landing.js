import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { StateContext } from '../App';

const Landing = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useContext(StateContext).AccessToken;

  const ComponentContainer = styled.div`
    /* stylez point */
  `;

  const login = () => {
    axios.get(`http://localhost:9000/auth/login`)
      .then(res => {
        window.location = res.data;
      })
      .catch(err => console.log(err));
  };

  const getAccessToken = (code) => {
    axios.post(`http://localhost:9000/auth/token`, {
      code
    })
    .then(res => {
      const access_token = res.data;
      
      if (!access_token.includes('error')) {
        removeCookie('code');
        setCookie('accessToken', access_token)
        setAccessToken(access_token);
        window.location = 'http://localhost:3000';
      }
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    const url = window.location.search;
    const getQuery = url.split('?')[1];

    if (getQuery && getQuery.includes('code') && !cookies.code) {
      const params = getQuery.split('&');
      const code = params[0].substring(5);
      setCookie('code', code);
      window.location.reload();
    }
  },[]);

  useEffect(() => {
    if (cookies.code && !cookies.accessToken) {
      getAccessToken(cookies.code);
    }
  },[]);

  return(
    <div>
      <h1>Welcome to my Landing Page!</h1>
      <button onClick={login}>Login with Spotify!</button>
    </div>
  );

};

export default Landing;