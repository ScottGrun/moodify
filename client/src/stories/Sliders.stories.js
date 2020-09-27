import React from "react";
import Sliders from '../components/Main/Sliders';

export default {
  title: "Sliders",
  component: Sliders,
};

const SlidersTemplate = (args) => <Sliders {...args} />;

export const SlideMe = SlidersTemplate.bind({});
