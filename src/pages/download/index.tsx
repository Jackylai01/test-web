import Modal from '@components/Modal';
import competitionPlanImage from '@public/Images/button/competition-plan.png';
import questionDatabaseImage from '@public/Images/button/question-database.png';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

const DownloadPage: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <article>
      <section className='image-container'>
        <a href='/files/113年新北電競王-競賽實施計畫.pdf' target='_blank'>
          <Image
            src={competitionPlanImage}
            alt='競賽實施計畫'
            width={600}
            height={300}
          />
        </a>
      </section>
      <section className='image-container'>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <Image
            src={questionDatabaseImage}
            alt='題庫下載'
            width={600}
            height={300}
          />
        </a>
      </section>
      {showModal && (
        <Modal currentValue={showModal} setCurrentValue={setShowModal}>
          <main className='main main__caption'>
            <p>此版本為舊年度競賽題庫，玩家可自行下載練習</p>
            <p>
              新年度題庫，預計於112年12月前完成更新上傳，詳情請依最新消息公告為主。
            </p>
            <a href='/files/111年健康識能競賽題庫.ods'>下載</a>
          </main>
        </Modal>
      )}
    </article>
  );
};

export default DownloadPage;
