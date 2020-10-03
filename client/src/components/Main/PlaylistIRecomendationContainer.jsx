import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import PlaylistItem from './PlaylistItem';
import { filterTracks } from '../../helpers/filter';
import axios from 'axios';

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

  @media (max-width: 375px) {
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

const PlaylistRecomendationContainer = (props) => {
  const {accessToken} = props;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [isShown, setShown] = useState(false);
  const [renderSongs, setRenderSongs] = useState([]);

  const getRecomendations = () => {
    const recomendationSeeds = filterTracks(userTracks, playlistMinMax).map((track) => ({
      track_id: track.id,
      artist_id: track.artist_id,
    }));

    axios
      .post(`http://localhost:9000/tracks/recommendations`, {
        accessToken,
        recomendationSeeds,
        playlistMinMax,
      })
      .then((res) => {
        let recomendedSongs = res.data.songs;

        recomendedSongs = recomendedSongs.map((song, index) => (
          <PlaylistItem idx={index} {...song} key={song.uid} />
        ));

        setRenderSongs(recomendedSongs);
      });
  };

  useEffect(() => {
    console.log('Now loading recommendations');
  }, [playlistMinMax]);

  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <StyledButtonContainer>
          <SectionHeader>Recommended Songs</SectionHeader>
          <RecomendButton>
            <img className="spacer" src={AddAllIcon} />
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
