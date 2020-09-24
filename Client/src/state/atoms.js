import { atom } from 'recoil';

export const codeTokenState = atom({
  key: 'codeToken',
  default: null,
})

export const accessTokenState = atom({
  key: 'accessToken',
  default: null,
});