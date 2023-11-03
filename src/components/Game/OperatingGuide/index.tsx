import imgOperatingGuide from '@public/game-source/doctor-message/operating-guide.png';
import { setGameModalType } from '@reducers/game';
import Image from 'next/image';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';

const OperationGuide = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setGameModalType(null));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div className='operating-guide'>
      <Image src={imgOperatingGuide} alt='操作說明' />
    </div>
  );
};

export default OperationGuide;
