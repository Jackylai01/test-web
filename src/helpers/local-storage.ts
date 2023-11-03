import { LocalStorageKey } from '@enums/local-storage-key';
import { isBrowser } from './utils';

export const loadJson = <T>(key: LocalStorageKey): T =>
  isBrowser() ? JSON.parse(localStorage.getItem(key) || 'null') : null;

export const saveJson = <T>(key: LocalStorageKey, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeJson = (key: LocalStorageKey) =>
  localStorage.removeItem(key);
