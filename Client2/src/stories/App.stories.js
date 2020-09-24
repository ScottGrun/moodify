import React from 'react';
import { RecoilRoot } from 'recoil';
import Landing from '../components/Landing';
import Main from '../components/Main/index';

export default {
  title: 'App',
  component: App,
};

export const LoggedIn = () => {
  const accessToken = true;

  return (
    <RecoilRoot>
      { accessToken
        ? <Main />
        : <Landing />
      }
    </RecoilRoot>
  )
};

export const LoggedOut = () => {
  const accessToken = false;

  return (
    <RecoilRoot>
      { accessToken
        ? <Main />
        : <Landing />
      }
    </RecoilRoot>
  )
};