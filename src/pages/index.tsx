import Navbar from '@components/Layout/ClientLayout/Navbar';
import News from '@components/Layout/ClientLayout/News';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <News />
    </>
  );
};

export default HomePage;
