import Link from 'next/link';

const News = () => {
  const newsData = [
    {
      category: 'Tech',
      date: '2023-09-05',
      title: 'The Rise of GPT-4',
      content:
        'OpenAI releases their latest language model, showcasingPositive economic indicators lead to a surge in stock prices',
    },
    {
      category: 'Business',
      date: '2023-09-04',
      title: 'Stock Market Soars',
      content:
        'Positive economic indicators lead to a surge in stock pricesPositive economic indicators lead to a surge in stock prices',
    },
    {
      category: 'Environment',
      date: '2023-09-03',
      title: 'New Renewable Energy Tech',
      content:
        ' redefine renewable energyPositive economic indicators lead to a surge in stock prices',
    },
  ];

  return (
    <article className='news__container'>
      {newsData.map((newsItem, index) => (
        <main key={index} className='news__card'>
          <section className='news__category'>
            <span>{newsItem.category}</span>
          </section>
          <div className='news__content'>
            {' '}
            {/* 新增這個 div */}
            <span className='news__date'>{newsItem.date}</span>
            <h4 className='news__title'>{newsItem.title}</h4>
            <p className='news__content-text'>{newsItem.content}</p>
          </div>
          <Link href='/'>
            <a className='news__read-more'>
              <span>READ MORE</span>
              <span className='news__arrow-icon'>➔</span>
            </a>
          </Link>
        </main>
      ))}
    </article>
  );
};

export default News;
