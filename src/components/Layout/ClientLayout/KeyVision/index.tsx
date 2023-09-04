import People from '@public/images/Navbar/KV工作區域.png';
import Image from 'next/image';

const KeyVision = () => {
  return (
    <>
      <article className='vision'>
        <main className='vision__container'>
          <section className='vision__container--title'>
            <h1>保護資安</h1>
            <h1 className='gradient-line'>守護未來</h1>
            <h3>資安不是選擇是必須</h3>
          </section>
          <span className='vision__container--slogan'>
            <p>
              在數位化的世界中，我們的價值、隱私和業務都儲存在數據中。讓我們攜手保護您的數據，守護您的未來。
            </p>
          </span>
          <section className='vision__img'>
            <Image src={People} />
          </section>
        </main>
      </article>
      ;
    </>
  );
};

export default KeyVision;
