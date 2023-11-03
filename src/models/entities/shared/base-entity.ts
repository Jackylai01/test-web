/** 基本實體 */
export class BaseEntity {
  /** ID */
  _id?: string;
  /** 建立時間 */
  createAt?: Date;
  /** 修改時間 */
  modifyAt?: Date;
  /** 修改者 ID */
  userId?: string;
}
