import Carousel from '@components/Carousel';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import '@styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const showCarousel = [
    '/',
    '/activity/story',
    '/activity/character',
    '/contact',
    '/faq',
    '/download',
    '/multimedia/gallery',
    '/multimedia/video',
    '/competition-method/skill',
    '/news/[id]',
  ].includes(router.route);

  return (
    <>
      <Head>
        <title>2024 新北小學堂電競王</title>
      </Head>
      <Navbar />
      {showCarousel && <Carousel />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
