import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';

import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px white;
`;

const StyledPlaylistContainer = styled.div`
  .song-list {
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }
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

  p {
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

const PlaylistItemContainer = (props) => {
  let count = 0;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [songs, setSongs] = useState([]);

  console.log(playlistMinMax);


  // let tempSongs = playlistMinMax.data.tempo
  //   ? props.songs
  //       .filter((song) => {
  //         if (
  //           song.audio.tempo <= playlistMinMax.data.tempo[1] &&
  //           song.audio.tempo >= playlistMinMax.data.tempo[0]
  //         ) {
  //           return true;
  //         }
  //       })
  //       .map((song) => {
  //         count ++;
  //        return  <PlaylistItem key={count} {...song} />;
  //       })
  //   : [];

  let tempSongs = props.songs.map((song) => <PlaylistItem key={song.id} {...song} />);

  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <SectionHeader>Yours Songs</SectionHeader>
        <ColumnHeaderContainer>
          <p>BPM</p>
          <p>Energy</p>
          <p>Danceability</p>
          <p>Valence</p>
          <p>instrumentalness</p>
          <p>Loudness</p>
        </ColumnHeaderContainer>
      </StyledHeader>
      <div className='song-list'>{songs}</div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
