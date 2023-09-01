import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUploadAction, adminUploadAsync } from './actions';

type AdminUploadState = ApiState<AdminUploadAction> & {
  fieldName: string | null;
  file: {
    _id: string;
    key: string;
    url: string;
    src: string;
  } | null;
};

const initialState: AdminUploadState = {
  fieldName: null,
  file: null,
  ...newApiState<AdminUploadState>(AdminUploadAction),
};

const adminUploadSlice = createSlice({
  name: ReducerName.ADMIN_UPLOAD,
  initialState,
  reducers: {
    setAdminUploadFieldName: (state, action: PayloadAction<string>) => {
      state.fieldName = action.payload;
    },
    resetAdminUpload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(adminUploadAsync.fulfilled, (state, action) => {
      state.file = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_UPLOAD);
  },
});

export const { setAdminUploadFieldName, resetAdminUpload } =
  adminUploadSlice.actions;
export default adminUploadSlice.reducer;
