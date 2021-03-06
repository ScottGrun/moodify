import React, { useState, useContext } from 'react';
import styled, {keyframes} from 'styled-components';
import { StateContext } from '../../App';
import axios from 'axios';
import { matchFilter } from '../../helpers/filter';
import { filterTracks } from '../../helpers/filter';
import { getTotalDuration } from '../../helpers/calculations';
import { serverRoot } from '../../env';

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

const CreatePlaylistModalContainer = styled.div`
  width: calc(100% - 20px);
  max-width: 614px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #28292D;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  display: none;
  animation: ${slideDown} 500ms ease;
  z-index: 99999999999;
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

      img {
        width: 212px;
        height: 212px;
        margin-bottom: 10px;
        object-fit: cover;

        @media (max-width: 600px) {
          width: 100px;
          height: 100px;
        }
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

      .image-label {
        margin-bottom: 7px;
      }

      .upload-file {
        padding: 5px 7px 5px 0;
        ${({ imageErrors }) => !imageErrors &&`
          margin-bottom: 15px;
        `}
      }

      .image-error {
        color: #f02b0f;
        font-size: 12px;

        &:last-of-type {
          margin-bottom: 10px;
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
        transition: all 0.2s ease-in-out;
        border-radius: 3px;

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

export default function CreatePlaylistModal(props) {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = props.openCreatePlaylistModal;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [snackbar, setSnackbar] = props.snackbar;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageErrors, setImageErrors] = useState('');

  const filteredTracks = filterTracks(userTracks, playlistMinMax);
  const duration = getTotalDuration(filteredTracks);

  const savePlaylist = (songs) => {
    const uris = filterTracks(songs, playlistMinMax).map(song => song.uri)
    ReactGA.event({
      category: "Save Playlist",
      action: "User clicked the save playlist button in the modal.",
    });
    axios.post(`${serverRoot}/playlists/create`, {
      accessToken,
      name,
      description,
      uris,
      image
    })
    .then((res) => {
      setOpenCreatePlaylistModal(false);
      setName('');
      setDescription('');
      setSnackbar({...snackbar, open: true, message: `${res.data.name} has been saved!`, variant: 'success'})
      props.getPlaylists();
    })
    .catch(res => {
      setOpenCreatePlaylistModal(false);
      const message = res.message.includes('414') ? "Sorry, you can't save that many songs at once." : res.message;
      setSnackbar({...snackbar, open: true, message, variant: 'error'});
    });
  };

  const setImageToInitial = () => {
    setImage(null);
  };

  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    const errors = [];

    if (!imageFile) {
      setImageToInitial();
      return;
    }
    
    if (imageFile.type !== 'image/jpeg') {
      errors.push('file type must be jpeg');
      setImageToInitial();
    }
    setImageErrors(errors);
    if (errors.length) return;

    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  return(
    <CreatePlaylistModalContainer open={openCreatePlaylistModal} imageErrors={imageErrors[0]}>
      <h1>Create Your Playlist</h1>
      <div className='content-container'>
        <div className='image-container'>
          <img src={image} />
          <div className='playlist-stats'>
            <p>Songs In Playlist — {filteredTracks && filteredTracks.length || 'NA'}</p>
            <p>Total Listening Time  — {duration || 'NA'}</p>
          </div>
        </div>
        <div className='form'>
          <label>
            Playlist Name
            <input placeholder={'Best Playlist'} value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <label className='image-label'>Image</label>
          <input className='upload-file' type='file' onChange={e => handleFileUpload(e)}/>
          {
            imageErrors.length > 0 && imageErrors.map((error, index) => <p key={index} className='image-error'>{error}</p>)
          }
          <label>
            Description (optional)
            <textarea placeholder='A super awesome playlist.' value={description} onChange={e => setDescription(e.target.value)}/>
          </label>
          <button className='save-playlist' onClick={() => savePlaylist(userTracks)}>Save Playlist</button>
        </div>
      </div>
    </CreatePlaylistModalContainer>
  );
};
