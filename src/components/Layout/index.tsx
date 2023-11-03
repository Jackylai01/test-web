import { LayoutType } from '@enums/layout-type';
import { toLayoutType } from '@helpers/router';
import { setLayoutType } from '@reducers/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import AdminLayout from './AdminLayout';
import ClientLayout from './ClientLayout';
import GameLayout from './GameLayout';
import ViewerLayout from './ViewerLayout';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { layoutType } = useAppSelector((state) => state.layout);

  const { pathname } = router;

  useEffect(() => {
    const newLayoutType = toLayoutType(pathname);
    if (layoutType === newLayoutType) return;
    dispatch(setLayoutType(newLayoutType));
  }, [dispatch, layoutType, pathname]);

  return (
    <>
      {layoutType === LayoutType.CLIENT && (
        <ClientLayout>{children}</ClientLayout>
      )}
      {layoutType === LayoutType.GAME && <GameLayout>{children}</GameLayout>}
      {layoutType === LayoutType.VIEWER && (
        <ViewerLayout>{children}</ViewerLayout>
      )}
      {layoutType === LayoutType.ADMIN && <AdminLayout>{children}</AdminLayout>}
    </>
  );
};

export default Layout;
