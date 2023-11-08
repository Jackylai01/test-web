import { News } from '@models/entities/news/news';
import { apiPublicDetailNews } from '@services/public/news/public-news';
import { GetServerSideProps, NextPage } from 'next';

type Props = {
  newsDetail: News;
};

const NewsDetailPage: NextPage<Props> = ({ newsDetail }) => {
  return (
    <>
      <article>
        <main className='news-detail'>
          <span className='news-detail-body' style={{ whiteSpace: 'pre-wrap' }}>
            <h3>{newsDetail?.title}</h3>
            {newsDetail?.body}
            {newsDetail?.photos?.map(({ index, imageUrl, description }) => (
              <span key={index} className='news-detail-photos'>
                <h6>{description}</h6>
                <img src={imageUrl} alt={description} />
              </span>
            ))}
          </span>
        </main>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const {
    result: { data: newsDetail },
  } = await apiPublicDetailNews(id);
  return { props: { newsDetail } };
};

export default NewsDetailPage;
