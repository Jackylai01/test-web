import { formatQueryString } from '@helpers/query';
import {
  ApiResult,
  getRequest,
  putRequest,
  uploadRequest,
} from '@services/shared/api';
import { CancelToken } from 'axios';
import { PrizeRecipient } from '../../../models/entities/prize-recipient';

export const apiClientGetPrizeRecipient = () =>
  getRequest<ApiResult<PrizeRecipient>>(formatQueryString('/prize-recipient'));

export const apiClientConfirmPrizeRecipient = (body: PrizeRecipient) =>
  putRequest('/prize-recipient', body);

export const apiClientUpload = async (
  file: File,
  onUploadProgress?: (progress: number, event: any, file: File) => void,
  cancelToken?: CancelToken,
) =>
  uploadRequest<ApiResult<{ url: string }>>(
    '/prize-recipient/upload',
    file,
    onUploadProgress,
    cancelToken,
  );
