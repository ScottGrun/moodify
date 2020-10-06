import React, { useState, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { StateContext } from '../../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { clientRoot, serverRoot } from '../../env';

// React-GA for Google Analytics
import ReactGA from 'react-ga';

const slideDown = keyframes`
  from{
    transform: translate(-50%, -60%);
    opacity: 0;
  }

  to{
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`

const SavePresetModalContainer = styled.div`
  width: calc(100% - 20px);
  max-width: 614px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: #28292D;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  display: none;
  animation: ${slideDown} 500ms ease;
  z-index: 999999999999999999999999;
  ${({ open }) => open && `
    display: block;
  `}

  h1 {
    font-size: 24px;
    letter-spacing: 0.2px;
    margin-bottom: 40px;
    text-align: center;
  }

  .content-container {
    display: flex;

    @media (max-width: 600px) {
      flex-wrap: wrap;
    }

    .image-container {
      margin-right: 25px;
      margin-top: 5px;

      img {
        width: 212px;
        height: 212px;
        margin-bottom: 10px;

        @media (max-width: 600px) {
          width: 100px;
          height: 100px;
        }
      }

      .preset-stats {
        font-size: 14px;
        color: #999999;
        margin-left: 5px;
        
        p {
          margin-bottom: 10px;
        }
      }
    }
    
    .form {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        display: flex;
        flex-direction: column;
        margin-bottom: 28px;

        input {
          margin-top: 10px;
          display: flex;
          align-items: center;
          font-size: 12px;
          letter-spacing: -0.2px;
          line-height: 20px;
          padding: 7px 12px;
          border-radius: 4px;
          border: none;

          &::placeholder {
            font-size: 12px;
            letter-spacing: -0.2px;
            color: #aaa;
            font-family: Inter;
          }

          &:focus {
            border: none;
            outline: none;
          }
        }

        input {
          height: 32px;
        }
      }

      .save-preset {
        height: 36px;
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.2px;
        border: 2px solid white;
        border-radius: 2px;
        margin-top: 30px;
        background-color: transparent;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:focus {
          outline: none;
        }

        &:hover {
          background-color: white;
          color: #191F35;
        }
      }
    }
  }
`;

export default function SavePresetModal(props) {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [openSavePresetModal, setOpenSavePresetModal] = props.openSavePresetModal;
  const [snackbar, setSnackbar] = props.snackbar;
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  
  const savePreset = () => {
    const user_id = cookies.MoodifyUserData.display_name;
    ReactGA.event({
      category: "Save Preset",
      action: "User clicked the save preset button in the modal.",
    });
    axios
      .post(`${serverRoot}/presets`, {
        name,
        audio_features: playlistMinMax.data,
        image_url: imageUrl,
        user_id
      })
      .then((res) => {
        setImageUrl(randomImageUrl());
        setOpenSavePresetModal(false);
        setName('');
        setSnackbar({ ...snackbar, open: true, message: `${res.data.name} has been saved!`, variant: 'success' });
        props.displayedPresets === 'yourpresets' ? props.refreshPresets() : props.setDisplayedPresets('yourpresets');
        // console.log(res);
      })
      .catch((res) => {
        setSnackbar({ ...snackbar, open: true, message: res.message, variant: 'error'});
        // console.log(err);
      });
  };

  const randomImageUrl = () => {
    const randomNumber = Math.ceil(Math.random() * 15);
    const imageUrl = `${clientRoot}/preset-image-library/preset-image${randomNumber}.svg`;
    // console.log(imageUrl)
    return imageUrl;
  };

  useEffect(() => {
    setImageUrl(randomImageUrl());
  }, []);

  const presetStats = () => {
    if (Object.keys(playlistMinMax.data).length > 0) {
      return (Object.keys(playlistMinMax.data).map(key => <p key={key}>{key}: {playlistMinMax.data[key][0]} — {playlistMinMax.data[key][1]}</p>)
      );
    }
  };

  return(
    <SavePresetModalContainer open={openSavePresetModal}>
      <h1>Save Your Preset</h1>
      <div className='content-container'>
        <div className='image-container'>
          <img src={imageUrl} alt="preset-default"/>
        </div>
        <div className='form'>
          <label>
            Preset Name (max 25 characters)
            <input placeholder={'Chill vibes.'} value={name} maxLength="25" onChange={e => setName(e.target.value)}/>
          </label>
          <div className='preset-stats'>
            {presetStats()}
          </div>
          <button className='save-preset' onClick={savePreset}>Save Preset</button>
        </div>
      </div>
    </SavePresetModalContainer>
  );
};
