import Contact from '@public/Images/Contact/活動網頁設計_改2OL-06.png';
import { NextPage } from 'next';
import Image from 'next/image';

const ContactPage: NextPage = () => {
  return (
    <>
      <article className='main__horizontal'>
        <Image src={Contact} alt='聯絡資訊' />
      </article>
      ;
    </>
  );
};

export default ContactPage;
