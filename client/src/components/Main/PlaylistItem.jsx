import styled, { keyframes } from 'styled-components';
import PlayButton from '../../assets/icons/PlayButton.svg';
import WaveFormSource from '../../assets/icons/audio.svg';
import setCurrentSongPlaying from '../../helpers/songPreviewManager';

import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';

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
  top: 0;
  left: 0;
  display: ${(props) => (props.playing ? 'flex' : 'none')};
  justify-content: center;
  background-color: rgba(46, 213, 137, 0.32);
  height: 45px;
  width: 45px;
  padding: 5px;
  border-radius: 5px 0px 0px 5px;
`;

const SongName = styled.h4`
  font-family: 'Inter';
  display: block;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: white;
  margin: 0;
  color: ${(props) => (props.playing ? '#2ed589' : null)};
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

  p {
    width: 75px;
    text-align: center;
  }
`;

const SongMetaData = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 12px;
  width: 275px;
  max-width: 275px;
`;

const StyledPlaylistItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #3c4051;
  height: 45px;
  width: 100%;
  border-radius: 5px;
  margin: 12px 0;
  position: relative;

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

const playProgress = keyframes`
from {
  width: 0%;
}

to {
 width: 100%;
}
`;

const StyledProgressContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 3px;
  padding-left: 45px;
  bottom: 0px;
  width: 0%;
  border-radius: 0px 0px 5px;
  z-index: 100;
  width: 100%;

  div {
    animation: ${(props) => (props.playing ? playProgress : null)} 30s linear;
    width: 0%;
    background-color: #2ed589;
  }

  @keyframes play-progress {
    0% {
      width: 0px;
    }
    100% {
      width: 200px;
    }
  }
`;

const PlaylistItem = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const newSong = new Audio(props.previewUrl);
      setCurrentSong(newSong);

      setCurrentSongPlaying(props.previewUrl, () => {
        newSong.pause();
        setCurrentSong(null);
        setPlaying(false);
      });

      newSong.play();
    } else if (currentSong !== null) {
      currentSong.pause();
    }
  }, [isPlaying]);

  const playPreview = () => {
    setPlaying(!isPlaying);
  };

  const playing = isPlaying;

  return (
    <StyledPlaylistItem onClick={playPreview}>
      <StyledSongCoverContainer>
        <StyledSongImage src={props.img} />
      </StyledSongCoverContainer>

      <OverlayContainer playing={playing}>
        {playing && <img src={WaveFormSource} />}
        {!playing && <img src={PlayButton} />}
      </OverlayContainer>
      <SongMetaData>
        <SongName playing={playing}>
          {' '}
          {props.name.length > 26 ? props.name.slice(0, 20) + '...' : props.name}
        </SongName>
        <ArtistName>{props.artist}</ArtistName>
      </SongMetaData>
      <AudioFeatures>
        <p>{Math.trunc(props.audio.tempo)}</p>
        <p>{Math.trunc(props.audio.energy * 100)}</p>
        <p>{Math.trunc(props.audio.danceability * 100)}</p>
        <p>{props.audio.valence}</p>
        <p>{Math.trunc(props.audio.instrumentalness * 100)}</p>
        <p>{Math.trunc(props.audio.loudness)}db</p>
      </AudioFeatures>
      <StyledProgressContainer playing={playing}>
        <div></div>
      </StyledProgressContainer>
    </StyledPlaylistItem>
  );
};

export default PlaylistItem;
