import ContainerBoard from '@components/ContainerBoard';
import FacebookAside from '@components/FacebookAside';
import Pagination from '@components/Pagination';
import { formatDisplayDate } from '@helpers/date';
import { News } from '@models/entities/news/news';
import { apiPublicListNews } from '@services/public/news/public-news';
import { ApiPaginationResult } from '@services/shared/api';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { useEffect, useState } from 'react';

type Props = {
  newsList: ApiPaginationResult<News>;
};

const HomePage: NextPage<Props> = ({ newsList }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 5 : 10;
  const totalPages = Math.ceil(newsList.data.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedNews = newsList.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <article>
        <main className='main__horizontal'>
          <ContainerBoard
            titleClassName='news-title'
            contentClassName='content'
          >
            <ul className='line-list'>
              {displayedNews?.map(({ _id, title, createAt }) => (
                <li key={_id}>
                  <Link href={`/news/${_id}`} legacyBehavior>
                    <span>
                      {createAt && formatDisplayDate(createAt)}
                      {title}
                    </span>
                  </Link>
                </li>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </ul>
          </ContainerBoard>
          <FacebookAside />
        </main>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { result: newsList } = await apiPublicListNews();
  return { props: { newsList } };
};

export default HomePage;
