import IntoGame from '@public/Images/Competition/intoGame.png';
import Return from '@public/Images/Competition/return.png';
import Team from '@public/Images/Competition/team.png';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CompetitionPage: NextPage = () => {
  return (
    <>
      <article>
        <main className='competition'>
          <Link href='/'>
            <Image src={Team} alt='隊伍管理' width={500} height={150} />
          </Link>
          <Link href='https://health-school.health.ntpc.gov.tw/2022/'>
            <Image src={Return} alt='重返星聯盟' width={500} height={150} />
          </Link>
          <Link href='https://health-school.health.ntpc.gov.tw/2022/'>
            <Image src={IntoGame} alt='進入遊戲' width={500} height={150} />
          </Link>
        </main>
      </article>
    </>
  );
};

export default CompetitionPage;
