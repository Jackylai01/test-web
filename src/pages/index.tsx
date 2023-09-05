import Activity from '@components/Layout/ClientLayout/Activity';
import Navbar from '@components/Layout/ClientLayout/Navbar';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Activity />
    </>
  );
};

export default HomePage;
