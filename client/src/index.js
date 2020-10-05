import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyle } from './styles';
require('dotenv').config();

ReactDOM.render(
  <CookiesProvider>
      <GlobalStyle />
      <App />
  </CookiesProvider>,
  document.getElementById('root')
);
