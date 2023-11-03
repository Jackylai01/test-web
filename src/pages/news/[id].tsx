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
      <article>
        <main className='news-detail'>
          {newsItem?.body && (
            <section
              className='news-detail-body'
              dangerouslySetInnerHTML={{ __html: newsItem.body }}
            ></section>
          )}
        </main>
      </article>
    </>
  );
};

export default NewsDetailPage;
