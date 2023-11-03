export class GameUser {
  /** ID */
  _id!: string;

  uuid!: string;

  account!: string;

  className!: string;

  /** 姓名 */
  name!: string;

  ip?: string;

  selected?: boolean = false;

  isReady?: boolean = false;
}
