import { configure, addDecorator } from "@storybook/react";
import { GlobalStyle } from '../src/styles';
import * as React from "react";

const req =  require.context('../src/stories', true, /\.stories\.js$/);

addDecorator(style => 
  <>
    <GlobalStyle />
    {style()}
  </>
);

configure(req, module)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}