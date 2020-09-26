import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyle } from './styles';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
        <GlobalStyle />
        <App />
        <div>hi</div>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
