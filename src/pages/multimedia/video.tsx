import ContainerBoard from '@components/ContainerBoard';
import { NextPage } from 'next';
import Link from 'next/link';

const videoLists = [
  {
    title: '【112學年度新北市健康識能競賽】決賽開賽影片',
    href: 'https://www.youtube.com/watch?v=Ztgc1RvpiQs',
  },
  {
    title: '【111學年度新北市健康識能競賽】教師研習營',
    href: 'https://www.youtube.com/watch?v=F2hEP0ZWdfY',
  },
  {
    title: '【109年新北市健康識能競賽】決賽精華剪輯',
    href: 'https://www.youtube.com/watch?v=AfSCMLKNMKw',
  },
  {
    title: '【109年新北市健康識能競賽】決賽現場片段',
    href: 'https://www.youtube.com/watch?v=Pu2Fgoq-29g',
  },
  {
    title: '【110年度新北市健康識能競賽】個人戰示範影片',
    href: 'https://www.youtube.com/watch?v=Mq5Djq_iiz8',
  },
  {
    title: '【110年度新北市健康識能競賽】教師研習營',
    href: 'https://www.youtube.com/watch?v=_7D7RHs1GBQ',
  },
];

const VideoPage: NextPage = () => {
  return (
    <>
      <article className='main__container'>
        <ContainerBoard
          className='container-board'
          contentClassName='multimedia-video'
          titleClassName='main-title'
        >
          <ul className='line-list__video'>
            {videoLists.map((items) => (
              <li key={items.title}>
                <Link href={items.href} passHref>
                  <a target='_blank' rel='noopener noreferrer'>
                    <h3>{items.title}</h3>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </ContainerBoard>
      </article>
    </>
  );
};

export default VideoPage;
