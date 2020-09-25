import React from "react";
import TestButton from "../components/TestButton/TestButton";

export default {
  title: "Test Button",
  component: TestButton,
};

const Template = (args) => <TestButton {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  imageUrl: "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
  artistName: "Carly Rae Jepsen",
  songName: "Cut To The Feeling",
};
