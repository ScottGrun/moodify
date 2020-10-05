import React from 'react';
import styled from 'styled-components';
import songAlbums from './assets/song-albums.png';

const StyledAlbumCovers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  color: white;
  background-color: #191F35;
  z-index: 0;

  .content-container {
    width: 100%;
    max-width: 1200px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text-container {
      width: 48%;
      max-width: 442px;

      p {
        font-size: 36px;
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

export default function AlbumCovers() {
  return(
    <StyledAlbumCovers>
      <div className='content-container'>
        <div className='text-container'>
          <p>Filter through your music library...</p>
        </div>
        <div className='album-images'>
          <img src={songAlbums} />
        </div>
      </div>
    </StyledAlbumCovers>
  )
};