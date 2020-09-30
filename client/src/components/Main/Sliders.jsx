import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../App';

import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

const SlidersContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  .values-container {
    width: 100%;
    color: #ccc;
    font-size: 10px;
    text-align: right;
  }

  .MuiSlider-markLabel {
    font-size: 12px;
    color: white;
  }

  .sliders {
    width: 100%;
    color: white;

    .slider-container {
      width: 100%;

      .MuiSlider-colorPrimary {
        color: #2ed689;
      }

      .MuiSlider-markLabelActive {
        display: none;
      }

      .labelStyleOuter {
        width: '30px';
        height: '30px;';
        border-radius: '50% 50% 50% 0';
        background-color: red;
        position: absolute;
        transform: 'rotate(-45deg)';
        top: '-40px';
        left: '-9px';
      }

      .labelStyleInner {
      }
    }
  }
`;

export default function Sliders() {
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;

  const [tempo, setTempo] = useState([0, 0]);
  const [danceability, setDanceability] = useState([0, 0]);
  const [energy, setEnergy] = useState([0, 0]);
  const [instrumentalness, setInstrumentalness] = useState([0, 0]);
  const [loudness, setLoudness] = useState([0, 0]);
  const [valence, setValence] = useState([0, 0]);

  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (playlistMinMax.data.tempo) {
      setTempo(playlistMinMax.data.tempo);
      setDanceability(playlistMinMax.data.danceability);
      setEnergy(playlistMinMax.data.energy);
      setInstrumentalness(playlistMinMax.data.instrumentalness);
      setLoudness(playlistMinMax.data.loudness);
      setValence(playlistMinMax.data.valence);

      setMarks({
        tempo: [
          {
            value: playlistMinMax.data.tempo[0],
            label: 'Min',
          },
          {
            value: playlistMinMax.data.tempo[1],
            label: 'Max',
          },
        ],
        danceability: [
          {
            value: playlistMinMax.data.danceability[0],
            label: 'Min',
          },
          {
            value: playlistMinMax.data.danceability[1],
            label: 'Max',
          },
        ],
        energy: [
          {
            value: playlistMinMax.data.energy[0],
            label: 'Min',
          },
          {
            value: playlistMinMax.data.energy[1],
            label: 'Max',
          },
        ],
        instrumentalness: [
          {
            value: playlistMinMax.data.instrumentalness[0],
            label: 'Min',
          },
          {
            value: playlistMinMax.data.instrumentalness[1],
            label: 'Max',
          },
        ],
        valence: [
          {
            value: playlistMinMax.data.valence[0],
            label: 'Min',
          },
          {
            value: playlistMinMax.data.valence[1],
            label: 'Max',
          },
        ],
        loudness: [
          {
            value: playlistMinMax.data.loudness[0],
            label: 'Playlist Min',
          },
          {
            value: playlistMinMax.data.loudness[1],
            label: 'Playlist Max',
          },
        ],
      });
    }
  }, [playlistMinMax.loaded]);

  // useEffect(() => {
  //   setChartValues([value1[1], value2[1], value3[1], value4[1], value5[1], value6[1]]);
  // },[value1[1], value2[1], value3[1], value4[1], value5[1], value6[1]]);

  return (
    <SlidersContainer>
      <div className="sliders">
        <div className="slider-container">
          <p>BPM</p>
          <Slider
            min={0}
            max={
              playlistMinMax.data.tempo && playlistMinMax.data.tempo[1] > 250
                ? playlistMinMax.data.tempo[1]
                : 250
            }
            value={tempo}
            step={5}
            marks={marks.tempo}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({ ...prev, data: { ...prev.data, tempo: val } }));
            }}
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
          <p>instrumentalness</p>
          <Slider
            min={0}
            max={100}
            value={instrumentalness}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({
                ...prev,
                data: { ...prev.data, instrumentalness: val },
              }));
            }}
            marks={marks.instrumentalness}
            onChange={(event, val) => setInstrumentalness(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Energy</p>
          <Slider
            min={0}
            max={100}
            value={energy}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({ ...prev, data: { ...prev.data, energy: val } }));
            }}
            marks={marks.energy}
            onChange={(event, val) => setEnergy(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Valence</p>
          <Slider
            min={0}
            max={100}
            value={valence}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({ ...prev, data: { ...prev.data, valence: val } }));
            }}
            marks={marks.valence}
            onChange={(event, val) => setValence(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Danceability</p>
          <Slider
            min={0}
            max={100}
            value={danceability}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({ ...prev, data: { ...prev.data, danceability: val } }));
            }}
            marks={marks.danceability}
            onChange={(event, val) => setDanceability(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider-container">
          <p>Loudness</p>
          <Slider
            min={-60}
            max={1}
            value={loudness}
            onChangeCommitted={(event, val) => {
              setPlaylistMinMax((prev) => ({ ...prev, data: { ...prev.data, loudness: val } }));
            }}
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
