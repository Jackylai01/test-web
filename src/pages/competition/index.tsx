import Return from '@public/Images/Competition/return.png';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SSO_URL } from '../../fixtures/constants';
import useAppSelector from '../../hook/useAppSelector';

const CompetitionPage: NextPage = () => {
  const { user } = useAppSelector((state) => state.clientAuth);
  return (
    <>
      <article>
        <main className='competition'>
          {/* <Link href='/'>
            <Image src={Team} alt='隊伍管理' width={500} height={150} />
          </Link> */}
          {user ? (
            <Link href='/2022/login'>
              <Image src={Return} alt='重返星聯盟' width={500} height={150} />
            </Link>
          ) : (
            <Link href={SSO_URL} legacyBehavior>
              <Image src={Return} alt='重返星聯盟' width={500} height={150} />
            </Link>
          )}
          {/* <Link href='/'>
            <Image src={IntoGame} alt='進入遊戲' width={500} height={150} />
          </Link> */}
        </main>
      </article>
    </>
  );
};

export default CompetitionPage;
