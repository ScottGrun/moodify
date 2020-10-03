import React from 'react';
import styled from 'styled-components';
import songAlbums from './assets/song-albums.png';

const StyledCatchPhrase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: calc(100% - 40px);
  height: 80vh;
  color: white;
  margin-top: 50px;

  .content-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text-container {
      width: 48%;
      max-width: 442px;

      h1 {
        font-size: 36px;
        letter-spacing: 2.4px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        letter-spacing: 1px;
      }
    }

    .album-images {
      width: 48%;

      img {
        width: 100%;
      }
    }
  }
`;

export default () => {
  return(
    <StyledCatchPhrase>
      <div className='content-container'>
        <div className='text-container'>
          <h1>MASTER YOUR MUSIC</h1>
          <p>use custom filtering based on spotify's audio features data to create the perfect playlsit for any mood</p>
        </div>
        <div className='album-images'>
          <img src={songAlbums} />
        </div>
      </div>
    </StyledCatchPhrase>
  )
};