import { loadToken } from '@helpers/token';
import axios from 'axios';
import { isBrowser } from '../../helpers/utils';

const instance = axios.create({
  baseURL: isBrowser() ? '/api' : 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = loadToken();
    if (token) {
      config.headers!.Authorization = `Bearer ${token.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return {
      res: response,
      status: response.status,
      result: response.data,
    } as any;
  },
  (error) => {
    if (!error.isAxiosError) {
      return Promise.reject(error);
    }

    return Promise.reject(
      error.response?.data?.message || error.response?.status,
    );
  },
);

export default instance;
