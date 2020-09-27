import React from "react";
import RadarChart from '../components/Main/RadarChart';

export default {
  title: "RadarChart",
  component: RadarChart,
};

const RadarChartTemplate = (args) => <RadarChart {...args} />;

export const RadarChart1 = RadarChartTemplate.bind({});
