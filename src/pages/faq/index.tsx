import ContainerBoard from '@components/ContainerBoard';
import Pagination from '@components/Pagination';
import { faqList } from '@fixtures/faq';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const QuestionPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 初始設為顯示5筆資料

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 860) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedFaqItems = faqList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <article className='main__horizontal'>
        <ContainerBoard
          className='container-board-alone'
          contentClassName='faq'
        >
          <ul className='faq-list'>
            {selectedFaqItems.map(({ question, answer }) => (
              <li key={question}>
                <h3 className='faq-list__title'>{question}</h3>
                {answer}
              </li>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(faqList.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </ul>
        </ContainerBoard>
      </article>
    </>
  );
};

export default QuestionPage;
