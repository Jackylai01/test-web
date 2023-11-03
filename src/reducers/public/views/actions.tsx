import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPublicViews } from '@services/public/views/public-views';

export enum PublicViewsAction {
  data = 'data',
}

export const publicViewsDataAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_VIEWS}/${PublicViewsAction.data}`,
  async () => {
    const response = await apiPublicViews();
    return response.result;
  },
);
