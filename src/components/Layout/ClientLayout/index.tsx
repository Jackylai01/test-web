import { loadToken } from '@helpers/token';

import { setClientAuthUser } from '@reducers/client/auth';
import { clientAuthLogoutAsync } from '@reducers/client/auth/actions';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const { showCarousel } = useAppSelector((state) => state.layout);

  useEffect(() => {
    const token = loadToken();

    if (!token) {
      dispatch(clientAuthLogoutAsync());
      return;
    }

    dispatch(setClientAuthUser(token));
  }, [dispatch]);

  return (
    <>
      {/* {showCarousel ? <Carousel /> : null} */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
