import { LayoutType } from '@enums/layout-type';

export const getMainRoute = (url: string) => url.split('/')[1];

export const toLayoutType = (url: string) => {
  const mainRoute = getMainRoute(url);

  switch (mainRoute) {
    case 'admin':
      return LayoutType.ADMIN;
    case 'competition':
      return url.includes('game') ? LayoutType.GAME : LayoutType.CLIENT;
    case 'viewer':
    case 'nuclear-bomb':
      return LayoutType.VIEWER;
    default:
      return LayoutType.CLIENT;
  }
};
