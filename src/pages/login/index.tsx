import { clientAuthRefreshAsync } from '@reducers/client/auth/actions';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!router.isReady) return;

    dispatch(clientAuthRefreshAsync());
    router.push('/');
  }, [dispatch, router]);

  return <></>;
};

export default LoginPage;
