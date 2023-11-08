import { clientRoutes } from '@fixtures/client-router';
import { SSO_URL } from '@fixtures/constants';
import Logo from '@public/Images/Logo/LOGO.png';
import NavbarIcon from '@public/Images/Navbar/Navbar-icon.png';
import Login from '@public/Images/Navbar/login.png';
import StartGame from '@public/Images/Navbar/開始遊戲.png';
import TeamManage from '@public/Images/Navbar/隊伍管理.png';
import { publicViewsDataAsync } from '@reducers/public/views/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

let ignore = false;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { data: viewsData } = useAppSelector((state) => state.publicViews);
  const { user } = useAppSelector((state) => state.clientAuth);

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

  useEffect(() => {
    !ignore && !viewsData && dispatch(publicViewsDataAsync());

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <nav className='navbar'>
      <section className='navbar__logo'>
        <Link href='/' passHref legacyBehavior>
          <span>
            <Image src={Logo} alt='logo' />
            <p className='navbar__visits'>
              網站瀏覽人次：{viewsData?.views.toLocaleString()}人
            </p>
          </span>
        </Link>
      </section>
      <main className='navbar__items'>
        {clientRoutes.map((item) => (
          <section key={item.title} className='navbar__dropdown-container'>
            <Link href={item.href} passHref legacyBehavior>
              <span className='navbar__item'>
                {item.title}
                {item.hasDropdown && (
                  <span className='navbar__item-arrow'>▼</span>
                )}
              </span>
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
                          <Link href={subItem.href} passHref legacyBehavior>
                            <span className='navbar__dropdown-item'>
                              {subItem.title}
                            </span>
                          </Link>
                          {subItem.hasDropdown && (
                            <span className='navbar__sub-dropdown'>
                              {subItem.children &&
                                subItem.children.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.title}
                                    href={subSubItem.href}
                                    passHref
                                    legacyBehavior
                                  >
                                    <span className='navbar__sub-dropdown-item'>
                                      {subSubItem.title}
                                    </span>
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

      {user ? (
        user.isTeacher ? (
          <Link href='/competition/team' legacyBehavior>
            <Image
              src={TeamManage}
              className='login-image'
              alt='隊伍管理'
              width={200}
              height={100}
            />
          </Link>
        ) : (
          <Link href='/competition/game' legacyBehavior>
            <Image
              src={StartGame}
              alt='開始遊戲'
              className='login-image'
              width={200}
              height={100}
            />
          </Link>
        )
      ) : (
        <Link href={SSO_URL} legacyBehavior>
          <Image src={Login} alt='登入按鈕' className='login-image' />
        </Link>
      )}

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
              <Link href={item.href} passHref legacyBehavior>
                <span className='navbar__item'>{item.title}</span>
              </Link>
              {item.hasDropdown &&
                item.children &&
                item.children.map((subItem) => (
                  <span className='navbar__drawer-dropdown' key={subItem.title}>
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      passHref
                      legacyBehavior
                    >
                      <span className='navbar__drawer-dropdown-item'>
                        {subItem.title}
                      </span>
                    </Link>
                    {subItem.hasDropdown &&
                      subItem.children &&
                      subItem.children.map((subSubItem) => (
                        <Link
                          key={subSubItem.title}
                          href={subSubItem.href}
                          passHref
                        >
                          <span
                            className={`navbar__drawer-dropdown-item ${
                              subSubItem.title === '校園初賽'
                                ? 'navbar__campus-prelims'
                                : subSubItem.title === '校園決賽'
                                ? 'navbar__campus-finals'
                                : ''
                            }`}
                          >
                            {subSubItem.title}
                          </span>
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
