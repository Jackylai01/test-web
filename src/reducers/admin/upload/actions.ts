import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiAdminUpload } from '@services/admin/upload/admin-upload';

export enum AdminUploadAction {
  upload = 'upload',
}

export const adminUploadAsync = createAsyncThunk(
  `${ReducerName.ADMIN_UPLOAD}/${AdminUploadAction.upload}`,
  async (file: File) => {
    const response = await apiAdminUpload(file);
    return response.result.data;
  },
);
