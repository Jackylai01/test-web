import { ADMIN_ROUTE } from '@fixtures/constants';

export type AsideRouterType = {
  icon: string;
  label: string;
  href: string;
};

export const platformMaintenanceRouter: AsideRouterType[] = [
  {
    icon: 'person',
    label: '後台帳號管理',
    href: 'admin-user',
  },
];

export const operateRouter: AsideRouterType[] = [
  {
    icon: 'home',
    label: '首頁',
    href: ADMIN_ROUTE,
  },
  { icon: 'create', label: '新增項目', href: 'create' },
  { icon: 'edit', label: '修改項目', href: '[id]' },
];

export const allAdminRouter: AsideRouterType[] = [
  ...platformMaintenanceRouter,
  ...operateRouter,
];

export const asideRouter = [
  {
    label: '平台維運管理',
    router: platformMaintenanceRouter,
  },
];
