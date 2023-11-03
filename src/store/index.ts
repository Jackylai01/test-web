import { isDebug } from '@fixtures/constants';
import type { AppStore } from '@models/store';
import appReducer from '@reducers';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import interceptAxiosErrorsMiddleware from './middleware/axios';
import socketGameMiddleware from './middleware/socketGame';

export const makeStore = () =>
  configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        socketGameMiddleware,
        interceptAxiosErrorsMiddleware,
      ]);
    },
    devTools: isDebug,
  });

const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

export default wrapper;
