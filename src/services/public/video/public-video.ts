import { Activity } from '@models/entities/activity/activity';
import { formatQueryString } from '../../../helpers/query';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-列表活動影片
 */
export const apiPublicListVideos = async () =>
  getRequest<ApiPaginationResult<Activity>>(
    formatQueryString('/public/videos'),
  );

/**
 * 前台-查看活動影片
 * @throws 404 NotFound 查無資料
 */
export const apiPublicDetailVideos = async (id: string) =>
  getRequest<ApiResult<Activity>>(`/public/videos/${id}`);
