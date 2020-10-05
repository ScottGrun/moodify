import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../App";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { filterTracks } from "../../helpers/filter";
import { getAverages } from "../../helpers/calculations";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

//images
import InfoIcon from "../../assets/icons/info-icon.svg";

const SlidersContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;

  .values-container {
    width: 100%;
    color: #ccc;
    font-size: 10px;
    text-align: right;
  }

  img {
    margin-left: 4px;
  }

  .MuiSlider-mark {
    width: 1;
    transform: translateY(-6px);
    height: 15px;
  }

  .MuiSlider-markLabel {
    font-size: 12px;
    color: white;
  }

  .sliders {
    width: 100%;
    color: white;

    .slider-container {
      p {
        display: inline-block;
      }
      width: 100%;

      .MuiSlider-colorPrimary {
        color: #2ed689;
      }

      .MuiSlider-markLabelActive {
        display: none;
      }

      .labelStyleOuter {
        width: "30px";
        height: "30px;";
        border-radius: "50% 50% 50% 0";
        background-color: red;
        position: absolute;
        transform: "rotate(-45deg)";
        top: "-40px";
        left: "-9px";
      }

      .labelStyleInner {
      }
    }
  }
`;

export default function Sliders(props) {
  const [songsInView, setSongsInView] = useContext(StateContext).SongsInView;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [chartValues, setChartValues] = props.chartValues;
  const [userTracks, setTracks] = props.userTracks;
  const [tempo, setTempo] = useState([0, 0]);
  const [danceability, setDanceability] = useState([0, 0]);
  const [energy, setEnergy] = useState([0, 0]);
  const [instrumentalness, setInstrumentalness] = useState([0, 0]);
  const [loudness, setLoudness] = useState([0, 0]);
  const [valence, setValence] = useState([0, 0]);
  const [marks, setMarks] = props.marksState;

  useEffect(() => {
    if (playlistMinMax.data.tempo) {
      setTempo(playlistMinMax.data.tempo);
      setDanceability(playlistMinMax.data.danceability);
      setEnergy(playlistMinMax.data.energy);
      setInstrumentalness(playlistMinMax.data.instrumentalness);
      setLoudness(playlistMinMax.data.loudness);
      setValence(playlistMinMax.data.valence);
      const filteredTracks = filterTracks(userTracks, playlistMinMax);
      const averages = getAverages(filteredTracks);
      setChartValues(averages);
    }
  }, [playlistMinMax.data]);

  const changeCommitedHandler = (event, val, attr) => {
    setPlaylistMinMax((prev) => ({
      ...prev,
      data: { ...prev.data, [attr]: val },
    }));
    setSongsInView(15);
  };

  return (
    <SlidersContainer>
      <div className="sliders">
        <div className="slider-container">
          <p>BPM</p>
          <Tippy
            content={
              <span>
                <b>BPM</b>
                <br />
                The overall estimated tempo / pace of a track in beats per
                minute.
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={1}
            min={0}
            max={
              playlistMinMax.data.tempo && playlistMinMax.data.tempo[1] > 250
                ? playlistMinMax.data.tempo[1]
                : 250
            }
            value={tempo}
            step={5}
            marks={marks.tempo}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "tempo")
            }
            onChange={(event, val) => {
              setTempo(val);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
            label={
              <div className="labelStyleOuter">
                <div className="labelStyleInner">73</div>
              </div>
            }
          />
        </div>
        <div className="slider-container">
          <p>Instrumentalness</p>
          <Tippy
            content={
              <span>
                <b>Instrumentalness</b>
                <br />
                The presence and amount of vocals: the higher the number, the
                more instrumental and less vocal.
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={2}
            min={0}
            max={100}
            value={instrumentalness}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "instrumentalness")
            }
            marks={marks.instrumentalness}
            onChange={(event, val) => setInstrumentalness(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Energy</p>
          <Tippy
            content={
              <span>
                <b>Energy</b>
                <br />
                The energetic feel of a track. For example, death metal has high
                energy, while a Bach prelude scores low on the scale.
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={3}
            min={0}
            max={100}
            value={energy}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "energy")
            }
            marks={marks.energy}
            onChange={(event, val) => setEnergy(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Valence</p>
          <Tippy
            content={
              <span>
                <b>Valence</b>
                <br />
                Tracks with high valence sound more positive (e.g. happy,
                cheerful, euphoric), while tracks with low valence sound more
                negative (e.g. sad, depressed, angry).{" "}
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={4}
            min={0}
            max={100}
            value={valence}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "valence")
            }
            marks={marks.valence}
            onChange={(event, val) => setValence(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Danceability</p>
          <Tippy
            content={
              <span>
                <b>Danceability</b>
                <br />
                How danceable a song feels,the higher the danceability better it
                is to dance to.
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={5}
            min={0}
            max={100}
            value={danceability}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "danceability")
            }
            marks={marks.danceability}
            onChange={(event, val) => setDanceability(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Loudness</p>
          <Tippy
            content={
              <span>
                <b>Loudness</b>
                <br />
                The average decibels (dB) of a track: the higher the dB, the
                louder it feels.
              </span>
            }
          >
            <img src={InfoIcon} />
          </Tippy>
          <Slider
            key={6}
            min={-60}
            max={0}
            value={loudness}
            onChangeCommitted={(event, val) =>
              changeCommitedHandler(event, val, "loudness")
            }
            marks={marks.loudness}
            onChange={(event, val) => setLoudness(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </SlidersContainer>
  );
}
