import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';

const RadarChartContainer = styled.div`
  width: 600px;
  height: 600px;
`;

export default function RadarChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['Speechiness', 'Energy', 'Valence', 'Danceability', 'Loudness'],
      datasets: [
        {
          label: 'Music Taste',
          data: [32, 45, 12, 76, 69],
          backgroundColor: 'rgba(50, 246, 152, 0.7)',
          borderColor: 'rgb(50, 246, 152)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(50, 246, 152)',
          pointBorderWidth: 1,
          fontColor: '#fff',
        }
      ]
    });
  };

  const chartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scale: {
      ticks: {
        callback: function() {return ""},
        backdropColor: "rgba(0, 0, 0, 0)"
      },
      pointLabels: {
        fontColor: 'white'
      },
      gridLines: {
        color: 'white'
      },
      angleLines: {
        color: 'white'
      }
    },
    tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }
  }

  useEffect(() => {
    chart();
  },[])

  return(
    <RadarChartContainer>
      <Radar data={chartData} options={chartOptions} />
    </RadarChartContainer>
  );
};