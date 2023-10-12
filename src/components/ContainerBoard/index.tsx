import { useState } from 'react';

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
  const [staticImagePath, setStaticImagePath] = useState(
    '/Images/ContainerBoard/board-web.png',
  );

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
