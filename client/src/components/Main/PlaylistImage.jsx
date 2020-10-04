import React, { useContext } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import { filterTracks } from '../../helpers/filter';
import { getTotalDuration } from '../../helpers/calculations';
import { useCookies } from 'react-cookie';


const PlayListImageContainer = styled.div`
  width: 100%;
  height: 224px;
  position: relative;
  display: flex;
  align-items: center;
  background-image: url(${props => props.playlistImage  } );
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 30px;

  .dark-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.7;
    backdrop-filter: blur(150px);
    border-radius: 10px;

  }

  .playlist-text {
    color: white;
    width: 90%;
    max-width: 365px;
    z-index: 9;

    .playlist-name {
      font-size: 24px;
      letter-spacing: -0.4px;
      margin-bottom: 10px;
    }

    .playlist-description {
      font-size: 14px;
      letter-spacing: 0.22px;
    }
  }

  .playlist-info {
    color: #808080;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    font-size: 14px;
    line-height: 20px;

    p {
      text-align: right;
    }
  }

  @media(max-width: 800px) {
    display: none;
  }
`;

const AlbumArt = styled.img`
  width:  200px;
  height: 200px;
  margin: 0 2rem;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
export default function PlaylistImage(props) {
  const [userTracks, setTracks] = props.userTracks;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const {title, description, image} = props.selectedPlaylist;
  const filteredTracks = filterTracks(userTracks, playlistMinMax);
  const duration = getTotalDuration(filteredTracks);
  const randomImageFromSpotify = 'https://i.imgur.com/iuyq8dP.png'
  const userData = cookies.userData;
  const userImageUrl = userData && userData.images && userData.images.length > 0 ? userData.images[0].url : null;

  return(
    <PlayListImageContainer playlistImage={image ? image.url : userImageUrl}> 
      <div className='dark-overlay' />
      <AlbumArt src={image ? image.url : userImageUrl}/>
      <div className='playlist-text'>
        <h2 className='playlist-name'>
          {title}
        </h2>
        <p className='playlist-description'>{description ? description.replaceAll(/<[^>]*>/g, "") : 'A playlist of music that surely can only be labeled as the greatest mixtape of all time.'}</p>
      </div>
      <div className='playlist-info'>
        <p>Songs In Playlist — {filteredTracks && filteredTracks.length || 'NA'}</p>
        <p>Total Listening Time — {duration || 'NA'}</p>
      </div>
    </PlayListImageContainer>
  );
}