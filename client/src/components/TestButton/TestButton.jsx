import React from "react";
import styled from "styled-components";

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #3c4051;
  height: 45px;
  border-radius: 5px;
`;

const StyledSongCover = styled.img`
  height: 100%;
  width: 44px;
  border-radius: 5px 0px 0px 5px;
  left: 0px;
`;

const SongName = styled.h4`
  font-family: "Inter";
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: white;
  margin: 0;
`;

const ArtistName = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: -0.157143px;
  color: #cecfd3;
  margin: 0;
`;

const TestButton = (props) => {
  return (
    <PlaylistItem>
      <StyledSongCover src={props.imageUrl} />
      <div>
        <SongName>{props.songName}</SongName>
        <ArtistName>{props.artistName}</ArtistName>
      </div>
    </PlaylistItem>
  );
};

export default TestButton;
