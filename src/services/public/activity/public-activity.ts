import { Activity } from '@models/entities/activity/activity';
import { formatQueryString } from '../../../helpers/query';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-列表活動相片
 */
export const apiPublicListActivities = async () =>
  getRequest<ApiPaginationResult<Activity>>(
    formatQueryString('/public/activities'),
  );

/**
 * 前台-查看最新消息
 * @throws 404 NotFound 查無資料
 */
export const apiPublicDetailActivities = async (id: string) =>
  getRequest<ApiResult<Activity>>(`/public/activities/${id}`);
