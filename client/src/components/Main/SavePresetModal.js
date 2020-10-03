import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SavePresetModalContainer = styled.div`
  width: 100%;
  max-width: 614px;
  height: 100%;
  max-height: 400px;
  position: absolute;
  border-radius: 4px;
  top: 50%;
  left: 20%;
  transform: translate(0, -50%);
  background-color: #28292D;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  display: none;
  z-index: 9999;
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

    .image-container {
      margin-right: 25px;
      margin-top: 5px;

      img {
        width: 212px;
        height: 212px;
        margin-bottom: 10px;
      }

      .preset-stats {
        font-size: 14px;
        color: #999999;
        
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
        background-color: transparent;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:focus {
          outline: none;
        }

        &:hover {
          background-color: #2ED689;
        }
      }
    }

  }
`;

export default function SavePresetModal() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [openSavePresetModal, setOpenSavePresetModal] = useContext(StateContext).OpenSavePresetModal;
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  
  const savePreset = () => {
    const user_id = cookies.userData.display_name;
    // console.log(user_id, name, imageUrl, playlistMinMax.data);
    // console.log(playlistMinMax.data.tempo);
    // console.log(playlistMinMax.data.instrumentalness);
    // console.log(playlistMinMax.data.energy);
    // console.log(playlistMinMax.data.valence);
    // console.log(playlistMinMax.data.danceability);
    // console.log(playlistMinMax.data.loudness);
    axios
      .post(`http://localhost:9000/presets`, {
        name,
        audio_features: playlistMinMax.data,
        image_url: imageUrl,
        user_id
      })
      .then((res) => {
        setImageUrl(randomImageUrl());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const randomImageUrl = () => {
    const randomNumber = Math.ceil(Math.random() * 15);
    const imageUrl = `http://localhost:3000/preset-image-library/preset-image${randomNumber}.svg`;
    // console.log(imageUrl)
    return imageUrl;
  };

  useEffect(() => {
    setImageUrl(randomImageUrl());
  }, []);

  const presetStats = () => {
    if (Object.keys(playlistMinMax.data).length > 0) {
      return (Object.keys(playlistMinMax.data).map(key => <p key={key}>{key}: {playlistMinMax.data[key][0]} - {playlistMinMax.data[key][1]}</p>)
      );
    }
  };

  return(
    <SavePresetModalContainer open={openSavePresetModal}>
      <h1>Save Your Preset</h1>
      <div className='content-container'>
        <div className='image-container'>
          <img src={imageUrl} alt="preset-default"/>
          <div className='preset-stats'>
            {presetStats()}
          </div>
        </div>
        <div className='form'>
          <label>
            Preset Name
            <input placeholder={'Chill vibes.'} value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <label>
            Image URL
            <input placeholder='Change default image.' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
          <button className='save-preset' onClick={savePreset}>Save Preset</button>
        </div>
      </div>
    </SavePresetModalContainer>
  );
};
