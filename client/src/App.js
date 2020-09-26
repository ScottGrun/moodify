import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Landing from './components/Landing';
import Main from './components/Main';

export const StateContext = React.createContext();



export default function App() {
  
  const [ cookies, setCookie, removeCookie ] = useCookies(['cookie-name']);
  const [ accessToken, setAccessToken ] = useState(null);

  if (cookies.accessToken && !accessToken) {
    setAccessToken(cookies.accessToken);
  }

  return (
    <StateContext.Provider value={ {
      AccessToken: [ accessToken, setAccessToken ],
    } }>
      { accessToken
        ? <Main />
        : <Landing />
      }
    </StateContext.Provider>
  );
}