import ContainerBoard from '@components/ContainerBoard';
import { newsList } from '@fixtures/news';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const NewsDetailPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  const { id } = router.query;
  const newsItem = newsList.find((news) => news._id === Number(id));

  return (
    <>
      <article className='main__container'>
        <ContainerBoard
          titleClassName='single-news'
          contentClassName='news-detail'
        >
          {newsItem?.body && (
            <main
              className='news-body'
              dangerouslySetInnerHTML={{ __html: newsItem.body }}
            ></main>
          )}
        </ContainerBoard>
      </article>
    </>
  );
};

export default NewsDetailPage;
