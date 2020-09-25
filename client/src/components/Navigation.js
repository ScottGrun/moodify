import React from 'react';
import styled from 'styled-components';
import musicIcon from '../assets/music-icon.svg';

const NavigationContainer = styled.div`
  
`;

export default function Navigation() {
  const playlists = ['Playlist 1', 'Playlist 2', 'Playlist 3', 'Playlist 4', 'Playlist 5']

  return(
    <NavigationContainer>
      <div className='browse-music'>
        <h4>Browse Music</h4>
        <ul className="categories">
          <li>
            <a><img /><p>Discover</p></a>
          </li>
          <li>
            <a><img /><p>Artists</p></a>
          </li>
          <li>
            <a><img /><p>Albums</p></a>
          </li>
        </ul>
      </div>
      <div className='my-playlists'>My Playlists</div>
      <ul className='playlists'>
        {
          playlists.map(playlist => {
            return (
              <li>
                <a><img src={musicIcon} /><p>{playlist}</p></a>
              </li>
            );
          })
        }
      </ul>
    </NavigationContainer>
  );
};