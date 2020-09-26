import React from "react";
import HeadphoneModel from '../components/HeadphoneModel';

export default {
  title: "HeadphoneModel",
  component: HeadphoneModel,
};

const Template = (args) => <HeadphoneModel {...args} />;

export const Headphones = Template.bind({});
