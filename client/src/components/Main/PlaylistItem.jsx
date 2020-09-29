import styled from 'styled-components';
import PlayButton from '../../assets/icons/PlayButton.svg';
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
  display: none;
  justify-content: center;
  background-color: rgba(46, 213, 137, 0.32);
  height: 45px;
  width: 45px;
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
  display: flex;
  align-items: center;
  background-color: #3c4051;
  height: 45px;
  width: 100%;
  border-radius: 5px;
  margin: 12px 0;

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
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [playing, setPlaying] = useState(false);
  const [songPreview, setPreview] = useState(null)

  const playPreview = () => {

    let song = null;

    if(!songPreview){
      song = new Audio(props.previewUrl);
      setPreview(song);
    }else {
      song = songPreview;
    }

    if (playing === false) {
      setPlaying(prev => true);
      song.play();
    } else if (playing === true){
      setPlaying(prev => false);
      song.pause();
    }

  };

  const matchFilter = () => {
    if (
      props.audio.energy * 100 <= playlistMinMax.data.energy[1] &&
      props.audio.energy * 100 >= playlistMinMax.data.energy[0] &&
      props.audio.tempo <= playlistMinMax.data.tempo[1] &&
      props.audio.tempo >= playlistMinMax.data.tempo[0] &&
      props.audio.instrumentalness * 100 <= playlistMinMax.data.instrumentalness[1] &&
      props.audio.instrumentalness * 100 >= playlistMinMax.data.instrumentalness[0] &&
      props.audio.loudness <= playlistMinMax.data.loudness[1] &&
      props.audio.loudness >= playlistMinMax.data.loudness[0] &&
      props.audio.danceability * 100 <= playlistMinMax.data.danceability[1] &&
      props.audio.danceability * 100 >= playlistMinMax.data.danceability[0] &&
      props.audio.valence * 100 <= playlistMinMax.data.valence[1] &&
      props.audio.valence * 100 >= playlistMinMax.data.valence[0]
    ) {
      return true;
    }
    return false;
  };

  if (playlistMinMax.data.tempo && matchFilter()) {
    return (
      <StyledPlaylistItem onClick={playPreview}>
        <StyledSongCoverContainer>
          <StyledSongImage src={props.img} />
        </StyledSongCoverContainer>

        <OverlayContainer>
          <img src={PlayButton} />
        </OverlayContainer>
        <SongMetaData>
          <SongName>{props.name}</SongName>
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
      </StyledPlaylistItem>
    );
  }

  return null;
};

export default PlaylistItem;
