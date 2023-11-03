import { clientAuthLogoutAsync } from '@reducers/client/auth/actions';
import { AnyAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

const interceptAxiosErrorsMiddleware: Middleware = ({ dispatch }) => {
  return (next) => (action) => {
    if (action.type.endsWith('rejected')) {
      dispatch(clientAuthLogoutAsync() as unknown as AnyAction);
    }

    next(action);
  };
};

export default interceptAxiosErrorsMiddleware;
