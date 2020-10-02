import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../App';
import axios from 'axios';
import { matchFilter } from '../../helpers/filter';
import { filterTracks } from '../../helpers/filter';
import { getTotalDuration } from '../../helpers/calculations';

const CreatePlaylistModalContainer = styled.div`
  width: 100%;
  max-width: 614px;
  height: 100%;
  max-height: 500px;
  position: absolute;
  border-radius: 5px;
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

      img {
        width: 212px;
        height: 212px;
        margin-bottom: 10px;
      }

      .playlist-stats {
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

        input, textarea {
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

        textarea {
          height: 102px;
          resize: none;
        }
      }

      .save-playlist {
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

export default function CreatePlaylistModal() {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useContext(StateContext).OpenCreatePlaylistModal;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [userTracks, setUserTracks] = useContext(StateContext).UserTracks;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const [validImage, setValidImage] = useState(false);

  const filteredTracks = filterTracks(userTracks, playlistMinMax);
  const duration = getTotalDuration(filteredTracks);

  const savePlaylist = (songs) => {
    const uris = songs.filter(song => matchFilter(song, playlistMinMax)).map(song => song.uri)
    axios.post(`http://localhost:9000/playlists/create`, {
      accessToken,
      name,
      description,
      uris,
      imageUrl 
    })
    .then((res) => {
      console.log(res);
      setOpenCreatePlaylistModal(false);
    });
  };

  return(
    <CreatePlaylistModalContainer open={openCreatePlaylistModal}>
      <h1>Create Your Playlist</h1>
      <div className='content-container'>
        <div className='image-container'>
          <img src={imageUrl} />
          <div className='playlist-stats'>
            <p>Songs In Playlist — {filteredTracks && filteredTracks.length || 'NA'}</p>
            <p>Total Listening Time  — {duration || 'NA'}</p>
          </div>
        </div>
        <div className='form'>
          <label>
            Playlist Name (optional)
            <input placeholder={'Best Playlist'} value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <label>
            Image URL (optional)
            <input placeholder='A super awesome playlist.' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
          <label>
            Description (optional)
            <textarea placeholder='A super awesome playlist.' value={description} onChange={e => setDescription(e.target.value)}/>
          </label>
          <button className='save-playlist' onClick={() => savePlaylist(userTracks.songs)}>Save Playlist</button>
        </div>
      </div>
    </CreatePlaylistModalContainer>
  );
};