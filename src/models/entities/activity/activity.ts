import { BaseEntity } from '../shared/base-entity';

/** 活動相片 */
export class Activity extends BaseEntity {
  /** 主旨 */
  title!: string;
  /** 連結 */
  link!: string;
}
