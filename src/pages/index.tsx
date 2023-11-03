import ContainerBoard from '@components/ContainerBoard';
import FacebookAside from '@components/FacebookAside';
import Pagination from '@components/Pagination';
import { newsList } from '@fixtures/news';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 5 : 10;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 556);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedNews = newsList.slice(
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
              {displayedNews.map(({ _id, title, createAt }) => (
                <li key={_id}>
                  <Link href={`/news/${_id}`} legacyBehavior>
                    <span>
                      {createAt}
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
}
