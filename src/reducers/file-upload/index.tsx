import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileUploadAction, fileUploadAsync } from './actions';
type FileUploadState = ApiState<FileUploadAction> & {
  fieldName: string | null;
  file: { url: string } | null;
  validateData: { [key: string]: string } | null;
};

const initialState: FileUploadState = {
  fieldName: null,
  file: null,
  validateData: null,
  ...newApiState<FileUploadState>(FileUploadAction),
};

const fileUploadSlice = createSlice({
  name: ReducerName.FILE_UPLOAD,
  initialState,
  reducers: {
    setFileUploadFieldName: (state, action: PayloadAction<string>) => {
      state.fieldName = action.payload;
    },
    setFileUploadValidateData: (
      state,
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.validateData = action.payload;
    },
    resetFileUpload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fileUploadAsync.fulfilled, (state, action) => {
      state.file = action.payload;
    });
    asyncMatcher(builder, ReducerName.FILE_UPLOAD);
  },
});

export const {
  setFileUploadFieldName,
  setFileUploadValidateData,
  resetFileUpload,
} = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
