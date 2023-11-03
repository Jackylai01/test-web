import { ReducerName } from '@enums/reducer-name';
import { removeToken, saveToken } from '@helpers/token';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientAuthRefresh } from '@services/client/auth/client-auth';

export enum ClientAuthAsyncAction {
  refreshToken = 'refreshToken',
  logout = 'logout',
}

export const clientAuthRefreshAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}/${ClientAuthAsyncAction.refreshToken}`,
  async () => {
    const response = await apiClientAuthRefresh();
    saveToken(response.result.data);
    return response.result.data;
  },
);

export const clientAuthLogoutAsync = createAsyncThunk(
  `${ReducerName.CLIENT_AUTH}/${ClientAuthAsyncAction.logout}`,
  async () => {
    removeToken();
  },
);
