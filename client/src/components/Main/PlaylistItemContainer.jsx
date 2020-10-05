import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
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

  .loading {
    width: 100%;
    height: 40px;
    font-weight: 400px;
    color: white;
    text-align: center;
    background-color: transparent;
  }
`;

const PlaylistItemContainer = (props) => {
  const [songsInView, setSongsInView] = useContext(StateContext).SongsInView;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [loading, setLoading] = props.loading;

  const observer = useRef();
  const lastSongElement = useCallback(node => {
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setSongsInView(prev => prev + 15)
      }
    });
    if (node) observer.current.observe(node);
  },[]);

  let renderSongs = [];
  let filteredTracks = [];
  if (playlistMinMax.data.tempo) {
    filteredTracks = filterTracks(userTracks, playlistMinMax);

    renderSongs = filteredTracks.slice(0, songsInView).map((song, index) => {
      return <PlaylistItem
        idx={index}
        {...song}
        key={song.id}
        playlistMinMax={props.playlistMinMax}
        userTracks={props.userTracks}
        chartValues={props.chartValues}
        snackbar={props.snackbar}
      />
    });
  }

  useEffect(() => {
    const songs = document.getElementsByClassName('playlist-item')
    if (songs.length > 0) {
      songs[0].scrollIntoView({ behavior: 'smooth' });
    };
  },[playlistMinMax.data])

  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <SectionHeader>Your Songs</SectionHeader>
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
        {
          playlistMinMax.data.tempo 
          && filteredTracks.length > songsInView 
          && <div className='loading' ref={lastSongElement}>Loading More Tracks...</div>}
      </div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
