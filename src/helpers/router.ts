import { PageLayoutType } from '@enums/page-layout-type';
import { ADMIN_ROUTE } from '@fixtures/constants';

export const pathnameRemoveQuery = (pathname: string) => {
  return pathname.split('?')[0]; // 去除 URL 中的 query 參數
};

export const getMainRoute = (url: string) => url.split('/')[1]; // 從 URL 中獲取主路由

export const toPageLayoutType = (pathname: string) => {
  if (pathname.startsWith(`/${ADMIN_ROUTE}/auth`)) {
    return PageLayoutType.ADMIN_AUTH; // 如果 URL 的開頭是 admin 的 auth 路由，則頁面佈局類型為 ADMIN_AUTH
  }

  const mainRoute = getMainRoute(pathname);
  switch (
    mainRoute // 根據主路由決定頁面佈局類型
  ) {
    case ADMIN_ROUTE:
      return PageLayoutType.ADMIN;
    default:
      return PageLayoutType.CLIENT;
  }
};
