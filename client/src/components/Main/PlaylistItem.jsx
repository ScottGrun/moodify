import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';
import axios from 'axios';

import styled, { keyframes } from 'styled-components';
import PlayButton from '../../assets/icons/PlayButton.svg';
import WaveFormSource from '../../assets/icons/audio.svg';
import setCurrentSongPlaying from '../../helpers/songPreviewManager';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

  @media (max-width: 375px) {
    display: none;
  }

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

const animateIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(-8px);
  }
  100% {
    opacity: 1;
  }
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

  /* Animations here */
  animation: ${animateIn} 300ms;
  animation-delay: calc(${props => props.idx < 50 ? props.idx : 0} * 65ms);
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;

  /*  */
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

const initialPosition = {
  mouseX: null,
  mouseY: null,
}

const PlaylistItem = (props) => {
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [chartValues, setChartValues] = useContext(StateContext).ChartValues;
  const [userTracks, setTracks] = useContext(StateContext).UserTracks;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [marks, setMarks] = props.marksState;

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const handleClick = (event) => {
    event.preventDefault();
    setPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

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

  const handleClose = (event) => {
    event.stopPropagation();
    setPosition(initialPosition);
  };

  const addSimilarSongs = (event, trackId) => {
    event.stopPropagation();
    setPosition(initialPosition);

    axios.post(`http://localhost:9000/tracks/recommendations`, {
      accessToken,
      recomendationSeeds: [{ track_id: trackId }],
      playlistMinMax
    })
    .then(res => {
      setTracks(prev => {
        return {
          loading: true,
          songs: [...res.data.songs, ...prev.songs],
        }
      });
      setChartValues(res.data.averages);
    });
  };

  // const setSongMinMaxes = (event, minMaxes) => {

  // };
  
  return (
    <StyledPlaylistItem 
      idx={props.idx} className="playlist-item" 
      onClick={playPreview} 
      onContextMenu={handleClick} 
      styled={{ cursor: 'context-menu' }}
    >
      <Menu
        open={position.mouseY !== null}
        onClose={handleClose}
        autoFocus={false}
        anchorReference="anchorPosition"
        anchorPosition={
          position.mouseY !== null && position.mouseX !== null
          ? { top: position.mouseY, left: position.mouseX }
          : undefined
        }
      >
        <MenuItem onClick={event => addSimilarSongs(event, props.id)}>add similar songs</MenuItem>
        <MenuItem onClick={handleClose}>remove song</MenuItem>
      </Menu>

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
