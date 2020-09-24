import React from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import Landing from './components/Landing';
import Main from './components/Main';
const { codeTokenState, accessTokenState } = require('./state/atoms');

function App() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useRecoilState(accessTokenState);

  if (cookies.accessToken && !accessToken) {
    setAccessToken(cookies.accessToken);
  }

  return (
    <div>
      { accessToken
        ? <Main />
        : <Landing />
      }
    </div>
  );
}

export default App;
