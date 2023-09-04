import Logo from '@public/images/Footer/footer-logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <main className='footer__container'>
          <section className='footer__container--contact'>
            <span className='footer__container--contact-logo'>
              <Image src={Logo} />
              <strong>
                <h2>國家資通安全研究院</h2>
                <span className='english-title'>
                  National Institute Of Cyber Security
                </span>
              </strong>
            </span>
            <p>地址：100057 臺北市中正區延平南路143號</p>
            <p>電話：(02)2739-1000 傳真：(02)2733-1655</p>
          </section>
          <section className='footer__container--lists'>
            <Link href='/news'>
              <a className='link-item'>最新消息</a>
            </Link>
            <Link href='/about'>
              <a className='link-item'>認識資安院</a>
            </Link>

            <Link href='/events'>
              <a className='link-item'>活動宣導</a>
            </Link>
            <Link href='/propaganda'>
              <a className='link-item'>宣導資料</a>
            </Link>
            <Link href='/security'>
              <a className='link-item'>資安培訓</a>
            </Link>
            <Link href='/question'>
              <a className='link-item'>常見問題</a>
            </Link>
          </section>
        </main>
        <article className='footer__links'>
          <ul>
            <a href='https://www.nics.nat.gov.tw/Privacy.htm?lang=zh'>
              隱私權及網站安全政策
            </a>
            /
            <a href='https://www.nics.nat.gov.tw/SexualHarassmentApplication.htm?lang=zh'>
              性騷擾申訴管道
            </a>
            <li>版權所有 © 2023 國家資通安全研究院</li>
            <li>進行轉載或複製請知會本網站取得同意</li>
          </ul>
        </article>
      </footer>
    </>
  );
};

export default Footer;
