import React from 'react';
import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem/PlaylistItem';

const StyledHeader = styled.div`
 display: flex;
  align-items: center;
border-bottom: solid 1px white;
`

const StyledPlaylistContainer = styled.div`
 display: flex;
  align-items: center;
`

const ColumnHeaderContainer = styled.div `
  width: 360px;
  display: flex;
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-family: Inter;
  font-size: 11px;
  font-weight: normal;

`

const SectionHeader = styled.h2`
width: 275px;
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
  const songs = props.songs.map((song) => <PlaylistItem {...song} />);

  return (
    <div>
      <StyledHeader>
        <SectionHeader>Yours Songs</SectionHeader>
      <ColumnHeaderContainer>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>

      </ColumnHeaderContainer>
      </StyledHeader>
      <div>{songs}</div>
    </div>
  );
};

export default PlaylistItemContainer;
