import { formatQueryString } from '@helpers/query';
import {
  ApiResult,
  getRequest,
  putRequest,
  uploadRequest,
} from '@services/shared/api';
import { CancelToken } from 'axios';
import { PrizeRecipient } from '../../../models/entities/prize-recipient';

export const apiPublicGetPrizeRecipient = (redeemCode: string) =>
  getRequest<ApiResult<PrizeRecipient>>(
    formatQueryString(`/public/prize-recipient/${redeemCode}`),
  );

export const apiPublicConfirmPrizeRecipient = (
  redeemCode: string,
  body: PrizeRecipient,
) => putRequest(`/public/prize-recipient/${redeemCode}`, body);

export const apiPublicUpload = async (
  file: File,
  validateData: { [key: string]: string },
  onUploadProgress?: (progress: number, event: any, file: File) => void,
  cancelToken?: CancelToken,
) =>
  uploadRequest<ApiResult<{ url: string }>>(
    `/public/prize-recipient/${validateData.redeemCode}/upload`,
    file,
    onUploadProgress,
    cancelToken,
  );
