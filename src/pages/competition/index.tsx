import IntoGame from '@public/Images/Competition/intoGame.png';
import Return from '@public/Images/Competition/return.png';
import Team from '@public/Images/Competition/team.png';
import Trunk from '@public/Images/Competition/trunk.png';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CompetitionPage: NextPage = () => {
  return (
    <>
      <article className='main main__vertical-axis'>
        <main className='competition'>
          <Image src={Trunk} alt='背景樹幹' />
          <section>
            <Link href='/'>
              <Image src={Team} alt='隊伍管理' />
            </Link>
            <Link href='https://health-school.health.ntpc.gov.tw/2022/'>
              <Image src={Return} alt='重返星聯盟' />
            </Link>
            <Link href='https://health-school.health.ntpc.gov.tw/2022/'>
              <Image src={IntoGame} alt='進入遊戲' />
            </Link>
          </section>
        </main>
      </article>
    </>
  );
};

export default CompetitionPage;
