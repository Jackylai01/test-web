import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppSelector from './useAppSelector';

const useAuthTeacher = () => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (!router.isReady || user?.isTeacher) return;
    router.push('/');
  }, [router, user]);

  return {};
};

export default useAuthTeacher;
