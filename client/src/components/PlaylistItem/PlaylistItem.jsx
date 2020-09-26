import React from "react";
import styled from "styled-components";
import PlayButton from "../../assets/icons/PlayButton.svg";
const StyledSongCoverContainer = styled.div`
  position: relative;
  height: 100%;
  width: 44px;
  border-radius: 5px 0px 0px 5px;
  left: 0px;
`;

const StyledSongImage = styled.img`
  height: 100%;
  border-radius: 5px 0px 0px 5px;
`;

const OverlayContainer = styled.div`
  position: absolute;
  display: none;
  justify-content: center;
  background-color: rgba(46, 213, 137, 0.32);
  height: 45px;
  width: 45px;
  border-radius: 5px 0px 0px 5px;
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

const AudioFeatures = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-family: Inter;
  font-size: 11px;
  font-weight: normal;
`;

const SongMetaData = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 12px;
`;

const StyledPlaylistItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #3c4051;
  height: 45px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }

  &:hover ${SongName} {
    color: #2ed589;
  }

  &:hover ${OverlayContainer} {
    display: flex;
  }
`;

const PlaylistItem = (props) => {
  return (
    <StyledPlaylistItem>
      <StyledSongCoverContainer>
        <StyledSongImage src={props.imageUrl} />
      </StyledSongCoverContainer>

      <OverlayContainer>
        <img src={PlayButton} />
      </OverlayContainer>
      <SongMetaData>
        <SongName>{props.songName}</SongName>
        <ArtistName>{props.artistName}</ArtistName>
      </SongMetaData>
      <AudioFeatures>
        <p>{props.bpm}</p>
        <p>{props.energy}</p>
        <p>{props.valence}</p>
        <p>{props.acousticness}</p>
        <p>{props.loudness}</p>
        <p>{props.danceability}</p>
      </AudioFeatures>
    </StyledPlaylistItem>
  );
};

export default PlaylistItem;
