import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../App';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

const SlidersContainer = styled.div`
  width: 100%;
  height: 100%;

  .values-container {
    width: 100%;
    color: #ccc;
    font-size: 10px;
    text-align: right;
  }

  .sliders {
    width: 100%;
    color: white;

    .slider-container {
      width: 100%;

      .MuiSlider-colorPrimary {
        color: #2ED689;
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
  const [ chartValues, setChartValues ] = useContext(StateContext).ChartValues;
  const [ value1, setValue1 ] = useState([10, 40]);
  const [ value2, setValue2 ] = useState([20, 50]);
  const [ value3, setValue3 ] = useState([30, 60]);
  const [ value4, setValue4 ] = useState([40, 70]);
  const [ value5, setValue5 ] = useState([50, 80]);
  const [ value6, setValue6 ] = useState([60, 90]);

  // useEffect(() => {
  //   setChartValues([value1[1], value2[1], value3[1], value4[1], value5[1], value6[1]]);
  // },[value1[1], value2[1], value3[1], value4[1], value5[1], value6[1]]);

  return (
    <SlidersContainer>
      {/* <div className='values-container'>
        <h1>BPM: min={value1[0]} max={value1[1]}</h1>
        <h1>Speechiness: min={value2[0]} max={value2[1]}</h1>
        <h1>Energy: min={value3[0]} max={value3[1]}</h1>
        <h1>Valence: min={value4[0]} max={value4[1]}</h1>
        <h1>Danceability: min={value5[0]} max={value5[1]}</h1>
        <h1>Loudness: min={value6[0]} max={value6[1]}</h1>
      </div> */}
      <div className='sliders'>
        <div className='slider-container'>
          <p>BPM</p>
          <Slider 
            min={0}
            max={100}
            value={value1}
            onChange={(event, val) => setValue1(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
            label={
              <div className='labelStyleOuter'>
                <div className='labelStyleInner'>
                  73
                </div>
              </div>
            }
          />
        </div>
        <div className='slider-container'>
          <p>Speechiness</p>
          <Slider 
            min={0}
            max={100}
            value={value2}
            onChange={(event, val) => setValue2(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
          />
        </div>
        <div className='slider-container'>
          <p>Energy</p>
          <Slider 
            min={0}
            max={100}
            value={value3}
            onChange={(event, val) => setValue3(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
          />
        </div>
        <div className='slider-container'>
          <p>Valence</p>
          <Slider 
            min={0}
            max={100}
            value={value4}
            onChange={(event, val) => setValue4(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
          />
        </div>
        <div className='slider-container'>
          <p>Danceability</p>
          <Slider 
            min={0}
            max={100}
            value={value5}
            onChange={(event, val) => setValue5(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
          />
        </div>
        <div className='slider-container'>
          <p>Loudness</p>
          <Slider 
            min={0}
            max={100}
            value={value6}
            onChange={(event, val) => setValue6(val)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelDisplay='auto'
          />
        </div>
      </div>
    </SlidersContainer>
  );
};