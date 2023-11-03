import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Token } from '@models/entities/auth/token';
import { User } from '@models/entities/user/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {
  ClientAuthAsyncAction,
  clientAuthLogoutAsync,
  clientAuthRefreshAsync,
} from './actions';

type AuthState = ApiState<ClientAuthAsyncAction> & {
  user: User | null;
  schoolCode: string | null;
};

const initialState: AuthState = {
  user: null,
  schoolCode: null,
  ...newApiState<AuthState>(ClientAuthAsyncAction),
};

const clientAuthSlice = createSlice({
  name: ReducerName.CLIENT_AUTH,
  initialState,
  reducers: {
    setClientAuthUser: (state, action: PayloadAction<Token>) => {
      const token = action.payload.accessToken;
      const user: User = jwt_decode(token);
      state.user = user;
      state.schoolCode = user.schools ? user.schools[0]?.schoolCode : '';
    },
    setClientAuthSchool: (state, action: PayloadAction<string>) => {
      state.schoolCode = action.payload;
    },
    resetClientAuthStatus: (state) => {
      state.status = initialState.status;
    },
    resetClientAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(clientAuthRefreshAsync.fulfilled, (state, action) => {
      clientAuthSlice.caseReducers.setClientAuthUser(state, action);
    });
    builder.addCase(clientAuthLogoutAsync.fulfilled, (state) => {
      state.user = null;
    });
    asyncMatcher(builder, ReducerName.CLIENT_AUTH);
  },
});

export const {
  setClientAuthUser,
  setClientAuthSchool,
  resetClientAuthStatus,
  resetClientAuth,
} = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
