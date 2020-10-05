import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyle } from './styles';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: '/home/moodify/public_html/moodify/shared/.env' });
}

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
        <GlobalStyle />
        <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
