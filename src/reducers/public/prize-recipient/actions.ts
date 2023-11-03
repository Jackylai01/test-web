import { ReducerName } from '@enums/reducer-name';
import { PrizeRecipient } from '@models/entities/prize-recipient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiPublicConfirmPrizeRecipient,
  apiPublicGetPrizeRecipient,
} from '@services/public/prize-recipients/public-prize-recipients';

export enum PublicPrizeRecipientAction {
  detail = 'detail',
  modify = 'modify',
}

export const publicPrizeRecipientDetailAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRIZE_RECIPIENT}/${PublicPrizeRecipientAction.detail}`,
  async (redeemCode: string) => {
    const response = await apiPublicGetPrizeRecipient(redeemCode);
    return response.result.data;
  },
);

export const publicPrizeRecipientModifyAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_PRIZE_RECIPIENT}/${PublicPrizeRecipientAction.modify}`,
  async (data: PrizeRecipient) => {
    await apiPublicConfirmPrizeRecipient(data.redeemCode, data);
    return data;
  },
);
