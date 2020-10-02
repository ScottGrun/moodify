import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../App';
import { Radar } from 'react-chartjs-2';
import { getAverages } from '../../helpers/calculations';

const RadarChartContainer = styled.div`
  width: 100%;

  h2 {
    margin-bottom: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    color: white;
  }
`;

export default function RadarChart(props) {
  const [chartValues, setChartValues] = props.chartValues;
  const [chartData, setChartData] = props.chartData;

  const chart = () => {
    setChartData({
      labels: ['Energy', 'Danceability', 'Valence', 'instrumentalness', 'Loudness'],
      datasets: [
        {
          data: chartValues,
          backgroundColor: 'rgba(50, 246, 152, 0.7)',
          borderColor: 'rgb(50, 246, 152)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(50, 246, 152)',
          pointBorderWidth: 1,
          fontColor: '#fff',
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    legend: {
      display: false,
    },

    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scale: {
      ticks: {
        callback: function () {
          return '';
        },
        backdropColor: 'rgba(0, 0, 0, 0)',
        beginAtZero: true,
        min: 0,
        max: 100,
      },
      pointLabels: {
        fontColor: 'white',
      },
      gridLines: {
        color: 'white',
      },
      angleLines: {
        color: 'white',
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      chartOptions.aspectRatio = 1;
    } else {
      chartOptions.aspectRatio = 2;
    }
    chart();
  }, [chartValues]);

  return (
    <RadarChartContainer>
      <h2>Curate Your Playlist</h2>
      <Radar data={chartData} height={null} width={null} options={chartOptions} />
    </RadarChartContainer>
  );
}
