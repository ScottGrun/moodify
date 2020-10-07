import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import chevron from "../../assets/chevron.svg";
import PlaylistItem from "./PlaylistItem";
import { filterTracks } from "../../helpers/filter";

//Spinners
import Loading from "./Loading";
import setCurrentSongPlaying from "../../helpers/songPreviewManager";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px white;
`;

const ColumnHeaderContainer = styled.div`
  width: calc(100% - 10px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-size: 11px;
  font-weight: normal;

  .feature-name {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    .chevrons {
      display: flex;
      flex-direction: column;
      align-items: space-between;
      justify-content: space-between;
      margin-left: 5px;
      height: 14px;
      position: relative;

      img {
        width: 7px;
      }

      .single-inc {
        position: absolute;
        top: 0;
      }

      .single-dec {
        position: absolute;
        bottom: 0;
      }
    }
  }

  @media (max-width: 450px) {
    display: none;
  }

  .feature-name {
    font-size: 14px;
    width: 75px;
    text-align: center;

    @media (max-width: 1125px) {
      width: 50px;
      .chevrons {
        display: none;
      }
    }
  }
`;

const EmptyStateMessage = styled.h6`
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 14rem;
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

const StyledPlaylistContainer = styled.div`
  position: relative;
  width: 100%;
  .song-list {
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }

  .context-menu-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .loading {
    width: 100%;
    height: 40px;
    font-weight: 400px;
    color: white;
    text-align: center;
    background-color: transparent;
  }
`;

const PlaylistItemContainer = (props) => {
  const [currentlyPlaying, setCurrentlyPLaying] = useState(null);
  const [songsInView, setSongsInView] = useContext(StateContext).SongsInView;
  const [playlistMinMax] = props.playlistMinMax;
  const [userTracks, setUserTracks] = props.userTracks;
  const [loading, setLoading] = props.loading;
  const [sortBy, setSortBy] = useState({
    tempo: null,
    energy: null,
    danceability: null,
    valence: null,
    instrumentalness: null,
    loudness: null,
  });

  const observer = useRef();
  const lastSongElement = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSongsInView((prev) => prev + 15);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  let renderSongs = [];
  let filteredTracks = [];
  if (playlistMinMax.data.tempo) {
    filteredTracks = filterTracks(userTracks, playlistMinMax);

    const songs = filteredTracks.slice(0, songsInView).map((song, index) => {
      return (
        <PlaylistItem
          currentlyPlaying={[currentlyPlaying, setCurrentlyPLaying]}
          idx={index}
          {...song}
          key={song.id}
          playlistMinMax={props.playlistMinMax}
          userTracks={props.userTracks}
          chartValues={props.chartValues}
          snackbar={props.snackbar}
        />
      );
    });

    renderSongs = songs;
  }

  const sortByFeature = (feature) => {
    let sortedTracks;

    if (sortBy[feature] === "inc" || !sortBy[feature]) {
      sortedTracks = userTracks.songs.sort((a, b) => {
        return a.audio[feature] - b.audio[feature];
      });
      setSortBy({
        tempo: null,
        energy: null,
        danceability: null,
        valence: null,
        instrumentalness: null,
        loudness: null,
        [feature]: "dec",
      });
    } else {
      sortedTracks = userTracks.songs.sort((a, b) => {
        return b.audio[feature] - a.audio[feature];
      });
      setSortBy({
        tempo: null,
        energy: null,
        danceability: null,
        valence: null,
        instrumentalness: null,
        loudness: null,
        [feature]: "inc",
      });
    }

    setUserTracks({ ...userTracks, songs: [...sortedTracks] });
  };

  useEffect(() => {
    const songs = document.getElementsByClassName("playlist-item");
    if (songs.length > 0) {
      songs[0].scrollIntoView({ behavior: "smooth" });
    }
  }, [playlistMinMax.data]);

  return (
    <StyledPlaylistContainer>
      <StyledHeader>
        <SectionHeader>Your Songs</SectionHeader>
        <ColumnHeaderContainer>
          <div className="feature-name" onClick={() => sortByFeature("tempo")}>
            BPM
            <div className="chevrons">
              {sortBy.tempo === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.tempo === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
          <div className="feature-name" onClick={() => sortByFeature("energy")}>
            Energy
            <div className="chevrons">
              {sortBy.energy === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.energy === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
          <div
            className="feature-name"
            onClick={() => sortByFeature("danceability")}
          >
            Dance
            <div className="chevrons">
              {sortBy.danceability === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.danceability === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
          <div
            className="feature-name"
            onClick={() => sortByFeature("valence")}
          >
            Valence
            <div className="chevrons">
              {sortBy.valence === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.valence === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
          <div
            className="feature-name"
            onClick={() => sortByFeature("instrumentalness")}
          >
            Instru
            <div className="chevrons">
              {sortBy.instrumentalness === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.instrumentalness === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
          <div
            className="feature-name"
            onClick={() => sortByFeature("loudness")}
          >
            Loudness
            <div className="chevrons">
              {sortBy.loudness === null ? (
                <>
                  <img src={chevron} />
                  <img src={chevron} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : sortBy.loudness === "dec" ? (
                <img
                  className="single-dec"
                  src={chevron}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img className="single-inc" src={chevron} />
              )}
            </div>
          </div>
        </ColumnHeaderContainer>
      </StyledHeader>
      <div className="song-list">
        {userTracks.loading === true ? (
          <Loading />
        ) : renderSongs.length === 0 ? (
          <EmptyStateMessage>
            Sorry ! We found no tracks match that filter.
          </EmptyStateMessage>
        ) : (
          renderSongs
        )}
        {playlistMinMax.data.tempo && filteredTracks.length > songsInView && (
          <div className="loading" ref={lastSongElement}>
            Loading More Tracks...
          </div>
        )}
      </div>
    </StyledPlaylistContainer>
  );
};

export default PlaylistItemContainer;
