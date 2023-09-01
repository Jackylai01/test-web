import { BaseUserEntity } from './shared/base-entity';
import { AccountStatus } from './shared/user-enum';

/** 管理員使用者 */
export class AdminUser extends BaseUserEntity {
  /** 姓名 */
  name!: string;

  /** 電子郵件 */
  email?: string;

  /** 手機號碼 */
  phoneNumber?: string;

  /** 帳號狀態 */
  accountStatus!: AccountStatus;

  /** 忘記密碼驗證碼 */
  forgotCode?: string;

  /** 忘記密碼驗證碼發送時間 */
  sendForgotCodeAt?: Date;

  /** 最後登入時間 */
  lastLoginAt?: Date;
}
