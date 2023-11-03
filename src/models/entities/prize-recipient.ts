import { BaseEntity } from './shared/base-entity';

/** 得獎紀錄 */
export class PrizeRecipient extends BaseEntity {
  /** 兌獎序號 */
  redeemCode!: string;
  /** 類型 */
  type!: PrizeType;
  /** 獎品名稱 */
  prizeName!: string;
  /** 電子郵件 */
  email!: string;
  /** 姓名 */
  name?: string;
  /** 身分證字號 */
  idNumber?: string;
  /** 市話 */
  phoneNumber?: string;
  /** 手機 */
  mobileNumber?: string;
  /** 通訊地址 */
  contactAddress?: string;
  /** 戶籍地址 */
  householdAddress?: string;
  /** 簽名檔 */
  signature?: string;
  /** 簽名日期 */
  signedAt?: Date;
  /** 身分證明文件 正面 */
  idCardFront?: string;
  /** 身分證明文件 反面 */
  idCardBack?: string;
}

export enum PrizeType {
  /** 完成修復核心 */
  個人賽 = '個人賽',
  /** 遊玩 24 次 */
  團體賽 = '團體賽',
  /** Facebook */
  Facebook = 'Facebook',
}
