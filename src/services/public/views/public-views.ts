import { Views } from '@models/entities/views/views';
import { getRequest } from '@services/shared/api';

/**
 * 前台-查看網站瀏覽人次
 * @throws 404 NotFound 查無資料
 */
export const apiPublicViews = async () => getRequest<Views>('/views');
