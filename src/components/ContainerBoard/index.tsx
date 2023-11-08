import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  title?: string;
  hint?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string; // 處理背景圖片的布局
  titleClassName?: string; // 處理標題的文字位置
};

const ContainerBoard = ({
  title,
  hint,
  children,
  className,
  contentClassName,
  titleClassName,
}: Props) => {
  const defaultImagePath = '/Images/ContainerBoard/最新消息.png';
  const createTeamImagePath = '/Images/ContainerBoard/board-long.png';
  const [staticImagePath, setStaticImagePath] = useState(createTeamImagePath);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (router.asPath !== '/') {
        setStaticImagePath(createTeamImagePath);
      } else {
        setStaticImagePath(defaultImagePath);
      }
    }
  }, [router.asPath, router.isReady]);

  return (
    <main className={`container-board ${className}`}>
      <h1 className={`container-board__${titleClassName}`}>{title}</h1>
      <article className='container-board__body'>
        <section className='container-board__board'>
          {hint ? <p className='container-board__hint'>{hint}</p> : null}
          <article
            className={`container-board__${contentClassName}`}
            style={{ backgroundImage: `url(${staticImagePath})` }}
          >
            {children}
          </article>
        </section>
      </article>
    </main>
  );
};

export default ContainerBoard;
