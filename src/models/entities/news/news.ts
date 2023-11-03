import { BaseEntity } from '../shared/base-entity';

/** 最新消息 */
export class News extends BaseEntity {
  /** 主旨 */
  title!: string;
  /** 內文 */
  body!: string;
  /** 簡介 */
  summary!: string;
  /** 圖片列表 */
  photos?: Photo[];
}

export class Photo {
  /** 編號 */
  index!: number;
  /** 圖片 Url */
  imageUrl!: string;
  /** 描述 */
  description!: string;
}
