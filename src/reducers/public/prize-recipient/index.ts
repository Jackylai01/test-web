import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { PrizeRecipient } from '@models/entities/prize-recipient';
import { createSlice } from '@reduxjs/toolkit';
import {
  PublicPrizeRecipientAction,
  publicPrizeRecipientDetailAsync,
  publicPrizeRecipientModifyAsync,
} from './actions';

type PublicPrizeRecipientState = ApiState<PublicPrizeRecipientAction> & {
  detail: PrizeRecipient | null;
};

const initialState: PublicPrizeRecipientState = {
  detail: null,
  ...newApiState<PublicPrizeRecipientState>(PublicPrizeRecipientAction),
};

const publicPrizeRecipientSlice = createSlice({
  name: ReducerName.PUBLIC_PRIZE_RECIPIENT,
  initialState,
  reducers: {
    resetPublicPrizeRecipientStatus: (state) => {
      state.status = initialState.status;
    },
    resetPublicPrizeRecipient: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      publicPrizeRecipientDetailAsync.fulfilled,
      (state, action) => {
        state.detail = action.payload;
      },
    );
    builder.addCase(
      publicPrizeRecipientModifyAsync.fulfilled,
      (state, action) => {
        state.detail = { ...state.detail, ...action.payload } as PrizeRecipient;
      },
    );
    asyncMatcher(builder, ReducerName.PUBLIC_PRIZE_RECIPIENT);
  },
});

export const { resetPublicPrizeRecipientStatus, resetPublicPrizeRecipient } =
  publicPrizeRecipientSlice.actions;
export default publicPrizeRecipientSlice.reducer;
