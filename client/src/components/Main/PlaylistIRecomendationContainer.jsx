import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import PlaylistRecomendationItem from './PlaylistRecomendationItem';
import { filterTracks } from '../../helpers/filter';
import axios from 'axios';
import { serverRoot } from '../../env';

// Images
import AddAllIcon from '../../assets/icons/add-all.svg';
import RefreshIcon from '../../assets/icons/refresh.svg';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px white;
`;

const StyledPlaylistContainer = styled.div`
  margin-top: 2rem;
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

  @media (max-width: 450px) {
    display: none;
  }

  p {
    font-size: 14px;
    width: 75px;
    text-align: center;
  }
`;

const RecomendButton = styled.button`
  display: flex;
  align-items: center;
  color: white;
  background-color: transparent;
  border: solid 1px white;
  font-family: 'Inter';
  font-weight: 700;
  margin: 0.25rem 1rem;
  border-radius: 3px;
  padding: 0.2rem 1rem;

  .spacer {
    width: 20px;
    margin-right: 5px;
  }

  .padding {
    margin-right: 5px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SectionHeader = styled.h2`
  font-family: Inter;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  letter-spacing: 0.2px;
  color: #ffffff;
`;

const StyledAddIcon = styled.img`
  margin-right: 5px;
  z-index: 99;

  &:hover {
    transform: scale(2);
  }
`;

const PlaylistRecomendationContainer = (props) => {
  
  const { accessToken } = props;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [snackbar, setSnackbar] = props.snackbar;
  const [renderSongs, setRenderSongs] = useState([]);
  const [renderSongData, setRenderSongData] = useState([]);

  const getRecomendations = () => {
    const recommendationSeeds = filterTracks(userTracks, playlistMinMax)
    .map(track => {
      return {
        track_id: track.id,
        artist_id: track.artist_id,
      }
    });

    axios.post(`${serverRoot}/tracks/recommendations`, {
      accessToken,
      recommendationSeeds,
      playlistMinMax,
    })
    .then((res) => {
      let recommendedSongs = res.data.songs;
      setRenderSongData(recommendedSongs);

      recommendedSongs = recommendedSongs.map((song, index) => (
        <PlaylistRecomendationItem
          {...song}
          key={song.id}
          idx={index}
          playlistMinMax={props.playlistMinMax}
          userTracks={props.userTracks}
          chartValues={props.chartValues}
          snackbar={props.snackbar}
        />
      ));

      setRenderSongs(recommendedSongs);
    })
    .catch(res => {
      setSnackbar({...snackbar, open: true, message: res.message, variant: 'error'});
    });
  };


  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <StyledButtonContainer>
          <SectionHeader>Recommended Songs</SectionHeader>
          <RecomendButton onClick={()=> setUserTracks(prev => ({...prev, songs:[...prev.songs, ...renderSongData]}))}>
            <StyledAddIcon className="spacer" src={AddAllIcon}  />
            Add All
          </RecomendButton>
        </StyledButtonContainer>

        <RecomendButton onClick={() => getRecomendations()}>
          <img className="padding" src={RefreshIcon} />
          Refresh
        </RecomendButton>
      </StyledHeader>

      <div className="song-list">
        {renderSongs.length === 0 ? <img src="https://i.imgur.com/xwQzRkv.gif" /> : renderSongs}
      </div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistRecomendationContainer;
