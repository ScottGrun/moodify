import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import { filterTracks } from '../../helpers/filter';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px white;
`;

const ColumnHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-family: Inter;
  font-size: 11px;
  font-weight: normal;

  @media(max-width: 375px){
    display: none;
  }

  p {
    font-size: 14px;
    width: 75px;
    text-align: center;
  }
`;

const SectionHeader = styled.h2`
  width: 345px;
  font-family: Inter;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  letter-spacing: 0.2px;
  color: #ffffff;
`;

const StyledPlaylistContainer = styled.div`
  position: relative;

  .song-list {
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }

  .context-menu-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
`;

const PlaylistItemContainer = (props) => {
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [userTracks, setUserTracks] = useContext(StateContext).UserTracks;

  let renderSongs = [];
  if (playlistMinMax.loaded && userTracks.loading) {
    const filteredTracks = filterTracks(userTracks, playlistMinMax);
    
    renderSongs = filteredTracks
      .map((song, index) => <PlaylistItem 
      {...song}
        idx={index} 
        key={song.id + index}
        marksState={props.marksState}
       />);
  }

  return (
    <StyledPlaylistContainer >
      <StyledHeader>
        <SectionHeader>Yours Songs</SectionHeader>
        <ColumnHeaderContainer>
          <p>BPM</p>
          <p>Energy</p>
          <p>Danceability</p>
          <p>Valence</p>
          <p>Instru.</p>
          <p>Loudness</p>
        </ColumnHeaderContainer>
      </StyledHeader>
      <div className="song-list">
        {renderSongs.length === 0 ? <img src="https://i.imgur.com/xwQzRkv.gif" /> : renderSongs}
      </div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
