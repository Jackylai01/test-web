import Logo from '@public/images/Logo/置換單位logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: '最新消息', href: '/news' },
    { label: '認識資安院', href: '/about' },
    { label: '活動宣導', href: '/events' },
    { label: '宣導資料', href: '/propaganda' },
    { label: '資安培訓', href: '/security' },
    { label: '常見問題', href: '/question' },
  ];

  useEffect(() => {
    // 定義一個檢查螢幕寬度的函數
    const checkScreenWidth = () => {
      if (window.innerWidth > 768) {
        // 你可以設置成你希望的寬度
        setIsWideScreen(true);
        setDrawerOpen(true);
      } else {
        setIsWideScreen(false);
        setDrawerOpen(false);
      }
    };

    checkScreenWidth(); // 初始時執行一次檢查
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // 事件型別
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      // 轉型為Node型別
      setDrawerOpen(false);
    }
  };

  return (
    <nav className='navbar'>
      <section className='navbar__logo'>
        <Link href='/'>
          <Image src={Logo} />
        </Link>
      </section>
      <main className='navbar__items'>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <a className='navbar__item'>{item.label}</a>
          </Link>
        ))}
      </main>
      <span
        className='navbar__hamburger'
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        ☰
      </span>
      {!isWideScreen ? (
        <section
          ref={drawerRef}
          className={`navbar__drawer ${
            drawerOpen ? 'navbar__drawer--active' : ''
          }`}
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <a className='navbar__item'>{item.label}</a>
            </Link>
          ))}
        </section>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
