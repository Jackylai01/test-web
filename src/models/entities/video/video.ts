import { BaseEntity } from '../shared/base-entity';

/** 活動影片 */
export class Video extends BaseEntity {
  /** 主旨 */
  title!: string;
  /** 連結 */
  link!: string;
}
