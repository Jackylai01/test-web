import { FileAccept } from '@enums/file-accept';
import { ReducerName } from '@enums/reducer-name';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FileSelectState = {
  folderId: string | null;
  active: boolean;
  fieldName: string;
  fileType: keyof typeof FileAccept;
  multiple: boolean;
  currentFileUrl: string | null;
  currentFiles: string[];
  fileUrl: string | null;
  fileUrls: string[] | null;
  alt: string | null;
};

type SetFileSelectAction = {
  active: boolean;
  fieldName: string;
  fileType: keyof typeof FileAccept;
  multiple?: boolean;
};

const initialState: FileSelectState = {
  folderId: null,
  active: false,
  fileType: 'ALL',
  multiple: false,
  fieldName: '',
  currentFileUrl: null,
  currentFiles: [],
  fileUrl: null,
  fileUrls: null,
  alt: null,
};

const fileSelectSlice = createSlice({
  name: ReducerName.FILE_SELECT,
  initialState,
  reducers: {
    setFileSelectFolderId: (state, action: PayloadAction<string>) => {
      state.folderId = action.payload;
    },
    setSelectActive: (state, action: PayloadAction<SetFileSelectAction>) => {
      state.active = action.payload.active;
      state.fieldName = action.payload.fieldName;
      state.fileType = action.payload.fileType;
      state.multiple = action.payload.multiple ?? false;
    },
    selectFileUrl: (state, action: PayloadAction<string | null>) => {
      if (state.multiple) {
        if (!action.payload) return;
        if (state.currentFiles.includes(action.payload)) {
          state.currentFiles = state.currentFiles.filter(
            (fileId) => fileId !== action.payload,
          );
        } else {
          state.currentFiles = [...state.currentFiles, action.payload];
        }
      } else {
        state.currentFileUrl = action.payload;
      }
    },
    checkFileUrl: (state) => {
      if (state.multiple) {
        state.fileUrls = state.currentFiles;
      } else {
        state.fileUrl = state.currentFileUrl;
      }
    },
    checkFileUrls: (state, action: PayloadAction<string[]>) => {
      state.fileUrls = [...(state.fileUrls ?? []), ...action.payload];
    },
    fileSelectReset: (state) => ({ ...initialState, folderId: state.folderId }),
  },
});

export const {
  setFileSelectFolderId,
  setSelectActive,
  selectFileUrl,
  checkFileUrl,
  checkFileUrls,
  fileSelectReset,
} = fileSelectSlice.actions;
export default fileSelectSlice.reducer;
