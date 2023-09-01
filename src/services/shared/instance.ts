import { ADMIN_API_ROUTE } from '@fixtures/constants';
import { loadAdminToken, loadClientToken } from '@helpers/token';
import axios from 'axios';

export const BASE_API_URL = '/api';
export const ACCESS_TOKEN_NAME = 'atn';

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const isAdmin = config.url?.includes(ADMIN_API_ROUTE);

    const token = isAdmin ? loadAdminToken() : loadClientToken();

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
  async (error) => {
    if (!error.isAxiosError) {
      console.log(error);
      return Promise.reject(error);
    }

    return Promise.reject(
      error.response?.data?.message || error.response?.status,
    );
  },
);

export default instance;
