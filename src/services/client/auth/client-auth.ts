import { Token } from '@models/entities/auth/token';
import { formatQueryString } from '../../../helpers/query';
import { ApiResult, postRequest } from '../../shared/api';

/**
 * 前台-刷新 Token
 */
export const apiClientAuthRefresh = async () =>
  postRequest<ApiResult<Token>>(formatQueryString('/auth/refresh'));
