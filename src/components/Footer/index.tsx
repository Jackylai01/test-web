import implementer from '@public/Images/Logo/implementer.png';
import organizer from '@public/Images/Logo/organizer.png';
import undertake from '@public/Images/Logo/undertake.png';
import Image from 'next/image';

const logos = [
  { image: organizer },
  { image: undertake },
  { image: implementer },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <ul className='footer__logos'>
        {logos.map(({ image }, index) => (
          <li key={index}>
            <Image src={image} alt='商標圖' />
          </li>
        ))}
      </ul>
      <p className='footer__info'>
        TEL： (02)8521-1503#1302 / MAIL：healthschool.ntpc@gmail.com
        <br />
        Copyright © 2023
        本網站為新北市政府版權所有，未經允許，不得以任何形式複製和採用。
      </p>
    </footer>
  );
};

export default Footer;
