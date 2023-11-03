import { LayoutType } from '@enums/layout-type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LayoutState = {
  layoutType: LayoutType;
  showCarousel: boolean;
};

const initialState: LayoutState = {
  layoutType: LayoutType.CLIENT,
  showCarousel: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayoutType: (state, action: PayloadAction<LayoutType>) => {
      state.layoutType = action.payload;
    },
    setShowCarousel: (state, action: PayloadAction<boolean>) => {
      state.showCarousel = action.payload;
    },
  },
});

export const { setLayoutType, setShowCarousel } = layoutSlice.actions;
export default layoutSlice.reducer;
