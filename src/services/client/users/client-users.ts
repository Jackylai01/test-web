import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendForgotCodeRequest,
} from '../../../models/requests/user.req';
import {
  AuthResponse,
  ProfileResponse,
} from '../../../models/responses/user.res';
import { validateSchema } from '../../../models/schema/base.schema';
import { ApiResult, getRequest, postRequest } from '../../shared/api';
import {
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SendForgotCodeSchema,
} from './client-users.schema';

/**
 * 會員-會員登入
 * @throws 403 Forbidden 帳號或密碼不正確
 * @throws 403 Forbidden 帳號已被鎖定
 */
export const apiClientUsersLogin = async (body: LoginRequest) => {
  const { error, value } = validateSchema(LoginSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest<ApiResult<AuthResponse>>('/client/users/login', value);
};

/**
 * 會員-會員刷新Token
 */
export const apiClientUsersTokenRefresh = async () =>
  postRequest<ApiResult<AuthResponse>>('client/refresh');

/**
 * 會員-會員登出
 */
export const apiClientUsersLogout = async () => postRequest('/client/logout');

/**
 * 會員-忘記密碼發送驗證信
 * @throws 403 Forbidden 您不能在一分鐘內重複發送驗證信
 */
export const apiClientUsersForgotPasswordSend = async (
  body: SendForgotCodeRequest,
) => {
  const { error, value } = validateSchema(SendForgotCodeSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest('/client/forgot', value);
};

/**
 * 會員-忘記密碼重設密碼
 * @throws 404 NotFound 查無此使用者
 * @throws 403 Forbidden 驗證碼不符
 */
export const apiClientUsersForgotPasswordReset = async (
  body: ResetPasswordRequest,
) => {
  const { error, value } = validateSchema(ResetPasswordSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest('/client/reset/:id/:code', value);
};

/**
 * 會員-會員註冊
 * @throws 403 Forbidden 確認密碼不相符
 * @throws 403 Forbidden 帳號已被使用
 * @throws 403 Forbidden Email 已被使用
 * @throws 403 Forbidden 手機號碼已被使用
 */
export const apiClientUsersRegister = async (body: RegisterRequest) => {
  const { error, value } = validateSchema(RegisterSchema(), body);
  if (error) {
    throw error;
  }
  return postRequest<ApiResult<{ _id: string }>>('/client/register', value);
};

/**
 * 會員-會員註冊重發 Email 驗證
 * @throws 403 Forbidden 您不能在一分鐘內重複發送驗證信
 */
export const apiClientUsersEmailConfirmationResend = async () =>
  postRequest(`/client/activation`);

/**
 * 會員-會員個人基本資料
 */
export const apiClientUsersProfile = async () =>
  getRequest<ProfileResponse>('/client/users/profile');
