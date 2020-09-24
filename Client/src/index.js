import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
