import { fieldQuery, formatQueryString } from '@helpers/query';
import { Metadata } from '@models/entities/shared/pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  metadata: Metadata;
};

const Pagination = ({ metadata }: Props) => {
  const [middenLinks, setMiddenLinks] = useState<(string | number)[]>([]);
  const { count, limit, last, page } = metadata;
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < last ? page + 1 : last;
  const startIndex = limit * (page - 1) + 1;
  const endIndex = page === last ? count - (page & limit) : page * limit;

  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    let links;

    if (last <= 8) {
      links = Array(last)
        .fill('')
        .map((e, index) => (index += 1));
    } else if (page <= 5) {
      links = Array(8)
        .fill('')
        .map((e, index) => (index += 1));
      links = [...links, '...', last];
    } else if (page >= last - 5) {
      let startNumber = last - 8;
      links = Array(8)
        .fill('')
        .map((e) => (startNumber += 1));
      links = [1, '...', ...links];
    } else {
      let startNumber = page - 4;
      links = Array(7)
        .fill('')
        .map((e) => (startNumber += 1));
      links = [1, '...', ...links, '...', last];
    }

    setMiddenLinks(links);
  }, [last, page]);

  useEffect(() => {
    if (Number(query.page ?? last) > last) {
      const routerLink = formatQueryString(pathname, {
        ...query,
        page: last,
      });
      router.push(routerLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, last]);

  const selectPageLimit = (limitNumber: string) => {
    if (!limitNumber) return;
    const routerLink = formatQueryString(pathname, {
      ...query,
      limit: limitNumber,
    });
    router.push(routerLink);
  };

  const linkString = (pageNumber: number): string => {
    return fieldQuery(pathname, { ...query, page: pageNumber });
  };

  const relString = (pageNumber: number): string | undefined => {
    return pageNumber === prevPage
      ? 'prev'
      : pageNumber === nextPage
      ? 'next'
      : undefined;
  };

  return (
    <footer className='pagination'>
      <section className='pagination__info'>
        <p>
          顯示 {startIndex}-{endIndex} 筆項目，總計 {page} 頁 {count} 個項目
        </p>
        {last > 1 && (
          <ul className='pagination__items'>
            <li>
              <a href='#'>
                <span className='icomoon-arrow-dropdown' title='上一頁'></span>
                <b>上一頁</b>
              </a>
            </li>
            {middenLinks.map((item, index) => (
              <li key={index}>
                {typeof item === 'number' ? (
                  <Link href={linkString(item)}>
                    <a
                      className={`${item === page ? 'active' : ''}`}
                      rel={relString(item)}
                    >
                      {item}
                    </a>
                  </Link>
                ) : (
                  item
                )}
              </li>
            ))}
            <li>
              <a href='#'>
                <span className='icomoon-arrow-dropdown'></span>
                <b>下一頁</b>
              </a>
            </li>
          </ul>
        )}
      </section>
      <section className='pagination__control'>
        <p>每頁筆數：</p>
        <form>
          <label htmlFor='pagination-show-number'>
            <select
              id='pagination-show-number'
              defaultValue={limit}
              onChange={(event) => selectPageLimit(event.target.value)}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </select>
          </label>
        </form>
      </section>
    </footer>
  );
};

export default Pagination;
