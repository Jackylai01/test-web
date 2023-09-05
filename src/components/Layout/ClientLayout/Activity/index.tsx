import { useState } from 'react';

const Activity = () => {
  // 假資料
  const activities = [
    {
      title: '科技論壇',
      name: '科技的未來',
      date: '2023/06/28 ~ 2023/07/13',
      category: 'tech',
    },
    {
      title: '藝術展覽',
      name: '當代藝術',
      date: '2023/06/28 ~ 2023/07/13',
      category: 'art',
    },
    {
      title: '經濟研討會',
      name: '經濟發展趨勢',
      date: '2023/06/28 ~ 2023/07/13',
      category: 'economy',
    },
    {
      title: '健康工作坊',
      name: '健康生活的秘訣',
      date: '2023/06/28 ~ 2023/07/13',
      category: 'health',
    },
  ];

  const uniqueCategories = [
    'all',
    ...Array.from(new Set(activities.map((act) => act.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredActivities =
    selectedCategory === 'all'
      ? activities
      : activities.filter((act) => act.category === selectedCategory);

  return (
    <main className='activity'>
      <article className='activity__categories'>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`activity__categories-btn ${
              cat === selectedCategory ? 'activity__categories-btn--active' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </article>
      <section className='activity__cards'>
        {filteredActivities.map((act, index) => (
          <span
            key={index}
            className={`activity__card activity__card--${act.category}`}
          >
            <h2 className='activity__card-header'>{act.title}</h2>
            <span className='activity__card-content'>
              <h2 className='activity__card-name'>{act.name}</h2>
              <p className='activity__card-date'>{act.date}</p>
            </span>
          </span>
        ))}
      </section>
    </main>
  );
};

export default Activity;
