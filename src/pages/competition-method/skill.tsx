import Character from '@public/Images/Activity/活動網頁設計_改2OL-05.png';
import { NextPage } from 'next';
import Image from 'next/image';

const SkillPage: NextPage = () => {
  return (
    <>
      <article className='main__horizontal'>
        <Image src={Character} alt='角色介紹' />
      </article>
    </>
  );
};

export default SkillPage;
