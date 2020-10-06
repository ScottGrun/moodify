import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { StateContext } from '../../App';
import { clientRoot, serverRoot } from '../../env';

// React-GA for Google Analytics
import ReactGA from 'react-ga';

// images
import vinylRecord from './assets/vinyl-record.png';
import patternSmall from './assets/pattern-small.svg';

const LandingPageContainer = styled.div`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  .section1 {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;

    .content-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;

      .content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .text-container {
            max-width: 540px;
            display: flex;
            flex-direction: column;
            color: white;

            h1 {
              font-size: 72px;
              letter-spacing: 3px;
              width: 100%;
              max-width: 517px;
              margin-bottom: 50px;
            }
            p {
              font-size: 24px;
              letter-spacing: 1px;
              margin-bottom: 50px;
              max-width: 560px;
            }
            button {
              color: black;
              background-color: white;
              width: 254px;
              height: 47px;
              border-radius: 4px;
              font-size: 18px;
              letter-spacing: 0;
              outline: none;
              border: none;
              font-weight: 600;
              cursor: pointer;
            }
          } 
        }

        .vinyl-record {
          width: 50%;
          height: 100%;
          background-image: url('https://i.imgur.com/FYPO0R0.png');
          background-size: cover;
          background-position: left;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 100%;
            max-width: 580px;
            border-radius: 50%;
            animation: rotation 3s infinite linear;

            &:hover {
              animation-play-state: paused;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1100px) {

    .section1 {

      .content-container {


        .content {
          flex-direction: column-reverse;

          .text {
            width: 100%;
            height: 100%;
            padding: 20px;

            .text-container {

              h1 {
                font-size: 48px;
                letter-spacing: 3px;
                margin-bottom: 40px;
                max-width: 357px;
              }
              p {
                font-size: 14px;
                letter-spacing: 1px;
                margin-bottom: 20px;
                max-width: 338px;
              }
              button {
                font-size: 18px;
                letter-spacing: 0;
                width: 212px;
                height: 40px;
              }
            } 
          }

          .vinyl-record {
            background-image: url(${props => props.patternSmall});
            background-size: cover;
            background-position: bottom;
            width: 100%;

            img {
              max-width: 300px;
              margin-bottom: 20px;

              &:hover {
                
              }
            }
          }
        }
      }
    }
  }
`;

const Landing = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useContext(StateContext).AccessToken;

  const login = () => {
    ReactGA.event({
      category: "Login With Spotify",
      action: "User clicked the login with Spotify button.",
    });
    axios.get(`${serverRoot}/auth/login`)
      .then(res => {
        window.location = res.data;
      })
      .catch(err => console.log(err));
  };

  const getAccessToken = (code) => {
    axios.post(`${serverRoot}/auth/token`, {
      code
    })
    .then(res => {
      const { access_token, refresh_token, user } = res.data;
      const now = new Date();
      let time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      
      if (!access_token.includes('error')) {
        removeCookie('MoodifyCode');
        setCookie('MoodifyAccessToken', access_token, {expires: now});
        setCookie('RefreshToken', refresh_token);
        setCookie('MoodifyUserData', JSON.stringify(user));
        setAccessToken(access_token);
        window.location = clientRoot;
      }
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    const url = window.location.search;
    const getQuery = url.split('?')[1];

    if (getQuery && getQuery.includes('code') && !cookies.MoodifyCode) {
      const params = getQuery.split('&');
      const code = params[0].substring(5);
      setCookie('MoodifyCode', code);
      window.location.reload();
    }
  },[]);

  useEffect(() => {
    if (cookies.MoodifyCode && !cookies.MoodifyAccessToken) {
      getAccessToken(cookies.MoodifyCode);
    }
  },[]);

  return(
    <LandingPageContainer patternSmall={patternSmall}>
      <section className='section1'>
        <div className='content-container'>
          <div className='content'>
            <div className='text'>
              <div className='text-container'>
                <h1>Create The Perfect Mood</h1>
                <p>Use custom filtering based on Spotify's audio features data to create the perfect playlist for any mood.</p>
                <button onClick={login}>Login With Spotify</button>
              </div>
            </div>
            <div className='vinyl-record'>
              <img src={vinylRecord}/>
            </div>
          </div>
        </div>
      </section>
    </LandingPageContainer>
  );

};

export default Landing;
