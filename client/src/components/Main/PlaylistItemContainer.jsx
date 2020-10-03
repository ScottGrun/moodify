import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import { filterTracks } from '../../helpers/filter';

//Spinners
import Loading from './Loading';

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

  @media (max-width: 450px) {
    display: none;
  }

  p {
    font-size: 14px;
    width: 75px;
    text-align: center;
    
    @media (max-width: 1125px) {
      width: 50px;
    }
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
  width: 100%;
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
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [loading, setLoading] = props.loading;

  let renderSongs = [];
  if (playlistMinMax.data.tempo) {
    const filteredTracks = filterTracks(userTracks, playlistMinMax);

    renderSongs = filteredTracks.slice(0,50).map((song, index) => (
      <PlaylistItem
        idx={index}
        {...song}
        key={song.id}
        playlistMinMax={props.playlistMinMax}
        userTracks={props.userTracks}
        chartValues={props.chartValues}
        snackbar={props.snackbar}
       />)
    );
  }

console.log(loading)

  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <SectionHeader>Yours Songs</SectionHeader>
        <ColumnHeaderContainer>
          <p>BPM</p>
          <p>Energy</p>
          <p>Dance.</p>
          <p>Valence</p>
          <p>Instru.</p>
          <p>Loudness</p>
        </ColumnHeaderContainer>
      </StyledHeader>
      <div className="song-list">
        {renderSongs.length === 0 ? <Loading/> : renderSongs}
      </div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
