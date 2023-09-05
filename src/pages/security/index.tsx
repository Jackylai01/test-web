import back from '@public/images/Security/back.png';

import Image from 'next/image';

const security = () => {
  return (
    <>
      <article className='security'>
        <main className='security__container'>
          <section className='security__top'>
            <span className='security__top--border'>
              <span className='security__top--border__contact'>
                <h2>資安菁英</h2>
                <h3>卓越安心</h3>
                <h4>知識的力量，堅實的保障。</h4>
              </span>
            </span>
            <span className='security__top--image'>
              <Image src={back} />
            </span>
          </section>
          <section className='security__bottom'></section>
        </main>
      </article>
    </>
  );
};

export default security;
