import Layout from '@components/Layout';
import wrapper from '@store';
import '@styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
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
          <title>2024 新北小學堂電競王</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          ></meta>
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
