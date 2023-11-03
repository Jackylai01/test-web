import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { PrizeRecipient } from '@models/entities/prize-recipient';
import { createSlice } from '@reduxjs/toolkit';
import {
  ClientPrizeRecipientAction,
  clientPrizeRecipientDetailAsync,
  clientPrizeRecipientModifyAsync,
} from './actions';

type ClientPrizeRecipientState = ApiState<ClientPrizeRecipientAction> & {
  detail: PrizeRecipient | null;
};

const initialState: ClientPrizeRecipientState = {
  detail: null,
  ...newApiState<ClientPrizeRecipientState>(ClientPrizeRecipientAction),
};

const clientPrizeRecipientSlice = createSlice({
  name: ReducerName.CLIENT_PRIZE_RECIPIENT,
  initialState,
  reducers: {
    resetClientPrizeRecipientStatus: (state) => {
      state.status = initialState.status;
    },
    resetClientPrizeRecipient: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      clientPrizeRecipientDetailAsync.fulfilled,
      (state, action) => {
        state.detail = action.payload;
      },
    );
    builder.addCase(
      clientPrizeRecipientModifyAsync.fulfilled,
      (state, action) => {
        state.detail = { ...state.detail, ...action.payload } as PrizeRecipient;
      },
    );
    asyncMatcher(builder, ReducerName.CLIENT_PRIZE_RECIPIENT);
  },
});

export const { resetClientPrizeRecipientStatus, resetClientPrizeRecipient } =
  clientPrizeRecipientSlice.actions;
export default clientPrizeRecipientSlice.reducer;
