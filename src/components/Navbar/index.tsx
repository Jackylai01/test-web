import { clientRoutes } from '@fixtures/client-router';
import Logo from '@public/Images/Logo/LOGO.png';
import NavbarIcon from '@public/Images/Navbar/Navbar-icon.png';
import Login from '@public/Images/Navbar/login.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth > 1200) {
        setIsWideScreen(true);
        setDrawerOpen(true);
      } else {
        setIsWideScreen(false);
        setDrawerOpen(false);
      }
    };

    checkScreenWidth();
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
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setDrawerOpen(false);
    }
  };

  return (
    <nav className='navbar'>
      <section className='navbar__logo'>
        <Link href='/' passHref>
          <a>
            <Image src={Logo} alt='logo' />
          </a>
        </Link>
        <p className='navbar__visits'>網站瀏覽人次：244,452人</p>
      </section>
      <main className='navbar__items'>
        {clientRoutes.map((item) => (
          <section key={item.title} className='navbar__dropdown-container'>
            <Link href={item.href} passHref>
              <a className='navbar__item'>
                {item.title}
                {item.hasDropdown && (
                  <span className='navbar__item-arrow'>▼</span>
                )}
              </a>
            </Link>
            {item.hasDropdown && (
              <section className='navbar__dropdown'>
                {item.hasDropdown && (
                  <main className='navbar__dropdown'>
                    {item.children &&
                      item.children.map((subItem) => (
                        <article
                          key={subItem.title}
                          className='navbar__dropdown-item-container'
                        >
                          <Link href={subItem.href} passHref>
                            <a className='navbar__dropdown-item'>
                              {subItem.title}
                              {/* {subItem.hasDropdown && (
                                <span className='navbar__item-arrow'>▼</span>
                              )} */}
                            </a>
                          </Link>
                          {subItem.hasDropdown && (
                            <span className='navbar__sub-dropdown'>
                              {subItem.children &&
                                subItem.children.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.title}
                                    href={subSubItem.href}
                                    passHref
                                  >
                                    <a className='navbar__sub-dropdown-item'>
                                      {subSubItem.title}
                                    </a>
                                  </Link>
                                ))}
                            </span>
                          )}
                        </article>
                      ))}
                  </main>
                )}
              </section>
            )}
          </section>
        ))}
      </main>

      <a href='https://sso.ntpc.edu.tw/login.aspx?ReturnUrl=http%3a%2f%2fauth.ntpc.edu.tw%2foauth%2fauthorize.php%3fclient_id%3d6f3d07158b1d49ada4f9c769e67dace0%26scope%3dUser.Identity%252cUser.ContactInfo%252cUser.Mail%252cUser.BasicInfo%252cUserInfo%252cUser.Application%252c*%253antpc.base%252cNTPC.Detial%26state%3d%26redirect_uri%3dhttp%253a%252f%252fhealth-school.health.ntpc.gov.tw%252fapi%252fauth%252fcallback%26response_type%3dcode%26code_challenge_method%3dS256%26code_challenge%3dKQGK53aEpQxNsc1p0ylOSeG8piUVkMrhHSKqDjVWmdM'>
        <Image src={Login} alt='login-button' className='login-image' />
      </a>

      <span
        className='navbar__hamburger'
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <Image src={NavbarIcon} alt='Hamburger menu' />
      </span>

      {!isWideScreen ? (
        <section
          ref={drawerRef}
          className={`navbar__drawer ${
            drawerOpen ? 'navbar__drawer--active' : ''
          }`}
        >
          <span
            className='navbar__drawer-close'
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </span>
          {clientRoutes.map((item) => (
            <aside key={item.title}>
              <Link href={item.href} passHref>
                <a className='navbar__item'>{item.title}</a>
              </Link>
              {item.hasDropdown &&
                item.children &&
                item.children.map((subItem) => (
                  <span className='navbar__drawer-dropdown' key={subItem.title}>
                    <Link key={subItem.title} href={subItem.href} passHref>
                      <a className='navbar__drawer-dropdown-item'>
                        {subItem.title}
                      </a>
                    </Link>
                    {subItem.hasDropdown &&
                      subItem.children &&
                      subItem.children.map((subSubItem) => (
                        <Link
                          key={subSubItem.title}
                          href={subSubItem.href}
                          passHref
                        >
                          <a
                            className={`navbar__drawer-dropdown-item ${
                              subSubItem.title === '校園初賽'
                                ? 'navbar__campus-prelims'
                                : subSubItem.title === '校園決賽'
                                ? 'navbar__campus-finals'
                                : ''
                            }`}
                          >
                            {subSubItem.title}
                          </a>
                        </Link>
                      ))}
                  </span>
                ))}
            </aside>
          ))}
        </section>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
