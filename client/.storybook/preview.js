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

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1440px',
      height: '1039px'
    }
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  phone: {
    name: 'Phone',
    styles: {
      width: '375px',
      height: '667px'
    }
  }
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: { viewports: customViewports },
}