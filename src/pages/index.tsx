import Footer from '@components/Layout/ClientLayout/Footer';
import Navbar from '@components/Layout/ClientLayout/Navbar';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default HomePage;
