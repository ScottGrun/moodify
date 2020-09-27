import React from "react";
import Preset from "../components/Presets/Preset";

export default {
  title: "Preset",
  component: Preset,
};

const Template = (args) => <Preset {...args} />;

export const FirstStory = Template.bind({});
