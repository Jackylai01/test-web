import { ReducerName } from '@enums/reducer-name';
import { isLoggedIn } from '@helpers/token';
import { AppState } from '@models/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientUpload } from '@services/client/prize-recipients/client-prize-recipients';
import { apiPublicUpload } from '@services/public/prize-recipients/public-prize-recipients';

export enum FileUploadAction {
  upload = 'upload',
}

export const fileUploadAsync = createAsyncThunk(
  `${ReducerName.FILE_UPLOAD}/${FileUploadAction.upload}`,
  async (file: File, { getState }) => {
    if (isLoggedIn()) {
      const response = await apiClientUpload(file);
      return response.result.data;
    } else {
      const { validateData } = (getState() as AppState).fileUpload;
      const response = await apiPublicUpload(file, validateData!);
      return response.result.data;
    }
  },
);
