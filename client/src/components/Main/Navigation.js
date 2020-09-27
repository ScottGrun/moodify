import React from 'react';
import styled from 'styled-components';

// components
import Profile from './Profile';

// images
import musicIcon from '../../assets/music-icon.svg';
import logo from '../../assets/logo.svg';
import leftArrow from '../../assets/left-arrow.svg';

const NavigationContainer = styled.div`
  height: 100vh;
  min-width: 200px;
  max-width: 200px;
  color: white;
  padding: 20px;
  z-index: 2;
  position: relative;

  .header {
    display: none;
    margin-bottom: 30px;
    justify-content: space-between;

    .minimize {
      position: absolute;
      right: 10px;
    }
  }

  & > .section:not(:last-child) {
    margin-bottom: 60px;
  }

  .title {
    margin-bottom: 25px;
    font-size: 18px;
    letter-spacing: -0.2px;
  }

  li {
    list-style: none;
    margin-bottom: 25px;
    font-size: 14px;
    letter-spacing: 0.28px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #ccc;

      img {
        margin-right: 25px;
        width: 20px;
        height: 20px;
      }

      p{
      }
    }
  }

  .profile-dropdown-container {
    display: none;
    position: absolute;
    bottom: 100px;
    left: 35px;
  }

  @media(max-width: 1300px) {
    min-width: 282px;
    max-width: 282px;
    background-color: #1C1D20;
    position: absolute;
    left: 0;
    display: none;
    z-index: 100;
    margin-top: -80px;

    .header {
      display: flex;
    }

    .profile-dropdown-container {
      display: block;
    }
  }
`;

export default function Navigation() {
  const playlists = ['Public playlist', 'Melancholy', 'Alternative', 'New Playlist'];

  return(
    <NavigationContainer>
      <div className='header'>
        <img src={logo} className='logo'/>
        <img src={leftArrow} className='minimize' />
      </div>
      <div className='section browse-music'>
        <h3 className='title'>Browse Music</h3>
        <ul className="categories">
          <li>
            <a href='/' targer='blank'><img src={musicIcon} /><p>Discover</p></a>
          </li>
          <li>
            <a href='/' targer='blank'><img src={musicIcon} /><p>Artists</p></a>
          </li>
          <li>
            <a href='/' targer='blank'><img src={musicIcon} /><p>Albums</p></a>
          </li>
        </ul>
      </div>
      <div className='section my-playlists'>
        <h3 className='title'>My Playlists</h3>
        <ul className='playlists'>
          {
            playlists.map(playlist => {
              return (
                <li key={playlist}>
                  <a href='/' targer='blank'><img src={musicIcon} /><p>{playlist}</p></a>
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className='profile-dropdown-container'>
        <Profile />
      </div>
    </NavigationContainer>
  );
};