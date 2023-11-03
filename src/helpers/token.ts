import { LocalStorageKey } from '@enums/local-storage-key';
import { Token } from '@models/entities/auth/token';
import { loadJson, removeJson, saveJson } from './local-storage';
import { isNullOrEmpty } from './utils';

export const isLoggedIn = () => {
  const token = loadToken();
  return !isNullOrEmpty(token);
};

export const loadToken = () => {
  return loadJson<Token>(LocalStorageKey.ACCESS_TOKEN_NAME);
};

export const saveToken = (response: Token) => {
  saveJson<Token>(LocalStorageKey.ACCESS_TOKEN_NAME, response);
};

export const removeToken = () => {
  removeJson(LocalStorageKey.ACCESS_TOKEN_NAME);
};

export const jwtDecode = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
