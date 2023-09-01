import { asideRouter } from '@fixtures/admin-router';
import type { NextPage } from 'next';
import Link from 'next/link';

const AdminHomePage: NextPage = () => {
  return (
    <>
      {asideRouter.map(({ label, router }) => (
        <section className='main__block' key={label}>
          <ul className='block-items'>
            {router.map(({ href, label, icon }) => (
              <li key={label}>
                <Link href={`/zigong/${href}`}>
                  <a>
                    <span className={`icomoon-${icon}`}></span>
                    <b>{label}</b>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export default AdminHomePage;
