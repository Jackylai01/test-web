import { formatQueryString } from '../../../helpers/query';
import { News } from '../../../models/entities/news/news';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-列表最新消息
 */
export const apiPublicListNews = async () =>
  getRequest<ApiPaginationResult<News>>(formatQueryString('/public/news'));

/**
 * 前台-查看最新消息
 * @throws 404 NotFound 查無資料
 */
export const apiPublicDetailNews = async (id: string) =>
  getRequest<ApiResult<News>>(`/public/news/${id}`);
