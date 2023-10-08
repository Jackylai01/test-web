import competitionPlanImage from '@public/Images/button/competition-plan.png';
import questionDatabaseImage from '@public/Images/button/question-database.png';
import type { NextPage } from 'next';
import Image from 'next/image';

const DownloadPage: NextPage = () => {
  return (
    <article className='main__container main__container--full'>
      <section className='image-container'>
        <a
          href='/files/111學年度新北市健康識能競賽實施計畫.pdf'
          target='_blank'
        >
          <Image
            src={competitionPlanImage}
            alt='競賽實施計畫'
            layout='responsive'
          />
        </a>
      </section>
      <section className='image-container'>
        <a href='/files/111年健康識能競賽題庫.ods'>
          <Image
            src={questionDatabaseImage}
            alt='題庫下載'
            layout='responsive'
          />
        </a>
      </section>
    </article>
  );
};

export default DownloadPage;
