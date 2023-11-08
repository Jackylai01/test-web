import Layout from '@components/Layout';
import wrapper from '@store';
import '@styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

const MyApp = ({ Component, ...pageProps }: AppProps) => {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(pageProps);

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
      <Provider store={store}>
        <Head>
          <title>新北電競王 - 夢幻果島大冒險</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=0.5'
          />
        </Head>
        {/* {showCarousel && <Carousel />} */}
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

export default MyApp;
