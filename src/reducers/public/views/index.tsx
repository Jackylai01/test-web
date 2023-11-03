import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Views } from '@models/entities/views/views';
import { createSlice } from '@reduxjs/toolkit';
import { PublicViewsAction, publicViewsDataAsync } from './actions';

type PublicViewsState = ApiState<PublicViewsAction> & {
  data: Views | null;
};

const initialState: PublicViewsState = {
  data: null,
  ...newApiState<PublicViewsState>(PublicViewsAction),
};

const publicViewsSlice = createSlice({
  name: ReducerName.PUBLIC_VIEWS,
  initialState,
  reducers: {
    resetPublicViews: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(publicViewsDataAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_VIEWS);
  },
});

export const { resetPublicViews } = publicViewsSlice.actions;
export default publicViewsSlice.reducer;
