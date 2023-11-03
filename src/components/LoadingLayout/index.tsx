import LoadingBlock from '@components/LoadingBlock';
import React from 'react';

type Props = {
  isLoading: boolean;
  arrayData?: any[] | null;
  children?: React.ReactNode;
};

const LoadingLayout = ({ isLoading, arrayData, children }: Props) => {
  if (isLoading) return <LoadingBlock />;

  if (arrayData && !arrayData?.length) {
    return (
      <article className='main__container'>
        <div className='main__info-show'>
          <h1>目前暫無資料</h1>
        </div>
      </article>
    );
  }

  return <>{children}</>;
};

export default LoadingLayout;
