import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { StateContext } from '../../App';

import logo from '../../assets/logo.svg';
import TurntableModel from './TurntableModel';

const Landing = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useContext(StateContext).AccessToken;

  const LandingPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('https://images.hdqwalls.com/wallpapers/abstract-dark-colorful-subtle-4k-xo.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
      position: absolute;
    }

    .content-container {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      width: 100%;
      max-width: 1440px;

      .logo {
        position: absolute;
        width: 200px;
        height: 100px;
        left: 30px;
      }

      .cta-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .cta {
          max-width: 432px;

          h1 {
            color: white;
            font-size: 64px;
          }

          button {
            width: 238px;
            height: 52px;
            font-size: 18px;
            color: white;
            background-color: #17C274;
            border-radius: 4px;
            outline: none;
            border: none;
            margin-top: 20px;

            :hover {
              cursor: pointer;
            }
          }
        }
      }

      .turntable-container {
        height: 100vh;
        width: 100%;
      }
    }
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
    console.log('1sdoifjsodifj')
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
    console.log('2sdoifjsodifj')
    if (cookies.code && !cookies.accessToken) {
      getAccessToken(cookies.code);
    }
  },[]);

  return(
    <LandingPageContainer>
      <div className='overlay' />
      <div className='content-container'>
        <img className='logo' src={logo} />
        <div className='cta-container'>
          <div className='cta'>
            <h1>Create your perfect mood with Moodify.</h1>
            <button onClick={login}>Login With Spotify</button>
          </div>
        </div>
        <div className='turntable-container'>
          <TurntableModel />
        </div>
      </div>
    </LandingPageContainer>
  );

};

export default Landing;