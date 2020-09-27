import React from 'react';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px white;
`

const StyledPlaylistContainer = styled.div`
<<<<<<< HEAD
  max-width: 684px;
=======
>>>>>>> 5651c99b93a1cbd624e68f5d6f31b53b4bb2ddf0
`

const ColumnHeaderContainer = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-family: Inter;
  font-size: 11px;
  font-weight: normal;

  p {
    width: 75px;
    text-align: center;
  }
`

const SectionHeader = styled.h2`
width: 345px;
font-family: Inter;
font-style: normal;
font-weight: 900;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

letter-spacing: 0.2px;

color: #FFFFFF;
`

const PlaylistItemContainer = (props) => {
console.log(props.songs);
const songs = props.songs.map((song) => <PlaylistItem key={song.id} bpm={12} energy={212} valence={212} acousticness={12} loudness={123} danceability={102}{...song} />);



  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <SectionHeader>Yours Songs</SectionHeader>
      <ColumnHeaderContainer>
        <p>BPM</p>
        <p>Energy</p>
        <p>Valence</p>
        <p>Acoustic</p>
        <p>Loudness</p>
        <p>Speechiness</p>
      </ColumnHeaderContainer>
      </StyledHeader>
      <div>{songs}</div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
