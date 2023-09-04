import KeyVision from '@components/Layout/ClientLayout/KeyVision';
import Navbar from '@components/Layout/ClientLayout/Navbar';
import type { NextPage } from 'next';
const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <KeyVision />
    </>
  );
};

export default HomePage;
