import { ReducerName } from '@enums/reducer-name';
import { PrizeRecipient } from '@models/entities/prize-recipient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiClientConfirmPrizeRecipient,
  apiClientGetPrizeRecipient,
} from '@services/client/prize-recipients/client-prize-recipients';

export enum ClientPrizeRecipientAction {
  detail = 'detail',
  modify = 'modify',
}

export const clientPrizeRecipientDetailAsync = createAsyncThunk(
  `${ReducerName.CLIENT_PRIZE_RECIPIENT}/${ClientPrizeRecipientAction.detail}`,
  async () => {
    const response = await apiClientGetPrizeRecipient();
    return response.result.data;
  },
);

export const clientPrizeRecipientModifyAsync = createAsyncThunk(
  `${ReducerName.CLIENT_PRIZE_RECIPIENT}/${ClientPrizeRecipientAction.modify}`,
  async (data: PrizeRecipient) => {
    await apiClientConfirmPrizeRecipient(data);
    return data;
  },
);
