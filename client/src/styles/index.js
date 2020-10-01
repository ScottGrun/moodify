import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Inter;
    background-color: #191F35;
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;

  }

  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 10px 10px transparent;
      border: solid 5px transparent;
  }

  ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 10px #2C3862;
      border: solid 3px transparent;
      border-radius: 5px;

  }
`;