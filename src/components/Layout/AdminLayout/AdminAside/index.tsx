import { asideRouter, AsideRouterType } from '@fixtures/admin-router';
import { ADMIN_ROUTE } from '@fixtures/constants';
import Link from 'next/link';
import { useState } from 'react';
import CustomPageBlock from './CustomPageBlock';

type Props = {
  pageInfo?: AsideRouterType;
};

/**manager-aside__header 裡面放LOGO */

const AdminAside = ({ pageInfo }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <aside className={`manager-aside${active ? ' active' : ''}`}>
      <nav
        className={`manager-aside__menu${active ? ' active' : ''}`}
        onClick={() => setActive(!active)}
        aria-hidden='true'
      >
        <span aria-hidden='true'></span>
        <span aria-hidden='true'></span>
        <span aria-hidden='true'></span>
      </nav>
      <header className='manager-aside__header'></header>
      <nav className='manager-aside__navbar'>
        {asideRouter.map(({ label, router }) => (
          <section key={label}>
            <sub>{label}</sub>
            <ul>
              {router.map(({ href, label, icon }) => (
                <li key={label}>
                  <Link href={`/${ADMIN_ROUTE}/${href}`}>
                    <a
                      className={
                        pageInfo && pageInfo.href === href ? 'active' : ''
                      }
                    >
                      <span className={`icomoon-${icon}`}></span>
                      <b>{label}</b>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <nav className='manager-aside__extra-navbar'>
        <CustomPageBlock />
      </nav>
    </aside>
  );
};

export default AdminAside;
