import { allAdminRouter, AsideRouterType } from '@fixtures/admin-router';
import { ADMIN_ROUTE } from '@fixtures/constants';
import { isAdminLoggedIn, loadAdminToken } from '@helpers/token';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { AuthResponse } from '@models/responses/user.res';
import { resetAdminAuth, setAdminUserInfo } from '@reducers/admin/auth';
import { adminRefreshTokenAsync } from '@reducers/admin/auth/actions';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminAside from './AdminAside';
import AdminHeader from './AdminHeader';

type Props = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pageInfo, setPageInfo] = useState<AsideRouterType>();
  const [hasTriedRefreshing, setHasTriedRefreshing] = useState(false);

  const {
    userInfo,
    error: { refreshTokenError },
  } = useAppSelector((state) => state.adminAuth);

  // 判定token是否過期，過期就重新取得token。後端回傳到期的時間(UTC)
  //  state 來確保只嘗試刷新 token 一次

  const checkAndRefreshToken = () => {
    if (!userInfo?.expirationDate) return;

    const expiration = new Date(userInfo.expirationDate);
    if (expiration <= new Date() && !hasTriedRefreshing) {
      dispatch(adminRefreshTokenAsync());
      setHasTriedRefreshing(true);
    }
  };

  // 如果有 token 就直接載入Redux 的 狀態到 store
  useEffect(() => {
    const storedData = loadAdminToken();
    if (storedData && storedData.userInfo) {
      const authResponse: AuthResponse = {
        accessToken: storedData.accessToken,
        refreshToken: storedData.refreshToken,
        userInfo: storedData.userInfo,
      };
      dispatch(setAdminUserInfo(authResponse));
    }
  }, []);

  // 檢查 token 是否過期。usrInfo 裡面有個欄位是expirationDate
  useEffect(() => {
    checkAndRefreshToken();
  }, [userInfo]);

  useEffect(() => {
    if (!isAdminLoggedIn() || (hasTriedRefreshing && !userInfo)) {
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [userInfo, hasTriedRefreshing]);

  useEffect(() => {
    if (refreshTokenError) {
      dispatch(resetAdminAuth());
      router.push(`/${ADMIN_ROUTE}/auth/login`);
    }
  }, [refreshTokenError, dispatch, router]);

  useEffect(() => {
    const mainRouter = router.asPath.split('/')[2] ?? ADMIN_ROUTE;
    const findMainRouter = allAdminRouter.find(({ href }) =>
      mainRouter.includes(href),
    );
    setPageInfo(findMainRouter);
  }, [router]);

  return (
    <>
      <Head>
        <title>{pageInfo?.label && `${pageInfo?.label} - `}營運管理平台</title>
      </Head>
      <AdminAside pageInfo={pageInfo} />
      <main className='manager-main'>
        <AdminHeader />
        <article className='manager-main__container'>
          <section className='manager-main__block'>
            <h2 className='manager-main__title'>{pageInfo?.label}</h2>
            {children}
          </section>
        </article>
      </main>
    </>
  );
};

export default AdminLayout;
