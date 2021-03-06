import React, { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { StateContext } from '../../App';
import styled from 'styled-components';
import { clientRoot } from '../../env';

const ProfileContainer = styled.div`
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;

  .profile-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #12172C;
    width: 100%;
    height: 40px;
    padding: 5px;
    z-index: 100;
    
    &:hover {
      cursor: pointer;
    }

    .profile-pic {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 3px;
    }

    .profile-name {
      color: white;
      user-select: none;
    }

    ion-icon {
      position: absolute;
      right: 10px;
      color: white;
      font-size: 20px;
    }
  }

  .dropdown-container {
    height: 40px;
    background-color: #12172C;
    width: 100%;
    transition: transform 0.2s ease-in-out;
    transform: translateY(-60px);
    ${({ open }) => open && `
      transform: translateY(0);
    `}

    ul {
      color: #ccc;

      li {
        list-style: none;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        user-select: none;

        ion-icon {
          font-size: 20px;
          color: white;
          margin-right: 10px;
        }

        &:hover {
          background-color: #242e51;
          cursor: pointer;
        }
      }
    }
  }
  /* #1a1b1d */
  @media(max-width: 1280px) {
    position: static;
    
    .profile-dropdown {
      background-color: #161719;
    }

    .dropdown-container {
      background-color: #25262a;

      ul li {
        &:hover {
          background-color: #161719;
        }
      }
    }
  }

  @media(max-width: 768px) {
    background-color: #1C1D20;

    .header {
      display: flex;
    }
  }
`;

export default function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => {
    setOpen(prev => !open);
  };

  const logout = () => {
    removeCookie('MoodifyAccessToken');
    removeCookie('MoodifyRefreshToken');
    removeCookie('MoodifyUserData');
    setAccessToken(null);
    window.location = clientRoot;
  };

  const userData = cookies.MoodifyUserData;
  const userImageUrl = userData && userData.images && userData.images.length > 0 ? userData.images[0].url : null;
  
  return(
    <ProfileContainer open={open} >
  
      <div className='profile-dropdown' onClick={toggleDropdown}>
        <img src={userImageUrl} className='profile-pic' />
        <p className='profile-name'>{userData.display_name || 'NA'}</p>
        <ion-icon className='dropdown-icon' name="chevron-down-outline"></ion-icon>
      </div>

      <div className='dropdown-container'>
        <ul>
          <li onClick={logout}>
            <ion-icon name="exit-outline"></ion-icon>
            Logout
          </li>
        </ul>
      </div>
    </ProfileContainer>
  );
};
