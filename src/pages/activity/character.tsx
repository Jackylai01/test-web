import Character from '@public/Images/Activity/活動網頁設計_改2OL-05.png';
import type { NextPage } from 'next';
import Image from 'next/image';

const ActivityCharacterPage: NextPage = () => {
  return (
    <>
      <article className='main__horizontal'>
        <Image src={Character} alt='角色介紹' width={1300} height={650} />
      </article>
    </>
  );
};

export default ActivityCharacterPage;
