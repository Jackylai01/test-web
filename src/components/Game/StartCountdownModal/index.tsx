import { countdownImageList } from '@fixtures/game';

import imgBackground from '@public/game-source/start-count-down/background.png';
import { setGameModalType, setIsGameStart } from '@reducers/game';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const StartCountdownModal = () => {
  const dispatch = useAppDispatch();
  const { game, side } = useAppSelector((state) => state.socketGame);
  const remainingSeconds = game?.[`${side}RemainingSeconds`] ?? 600;

  const [countdown, setCountdown] = useState(600 - remainingSeconds);
  const isLast = countdown >= countdownImageList.length - 1;

  useEffect(() => {
    if (countdown >= countdownImageList.length) {
      dispatch(setGameModalType(null));
      dispatch(setIsGameStart(true));
      return;
    }

    const timer = setInterval(() => {
      if (countdown >= countdownImageList.length) {
        clearInterval(timer);
        return;
      }

      setCountdown((prevValue) => prevValue + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown, dispatch]);

  return (
    <>
      {countdown <= countdownImageList.length && (
        <article className='question-board'>
          <div className='question-board__background question-board__background--result'>
            <Image src={imgBackground} alt='倒數開始背景' />
          </div>
          <section className='question-board__main question-board__main--countdown'>
            <Image
              src={
                isLast
                  ? countdownImageList[countdownImageList.length - 1]
                  : countdownImageList[countdown]
              }
              alt='倒數秒數'
              style={isLast ? { aspectRatio: 3 } : undefined}
            />
          </section>
        </article>
      )}
    </>
  );
};

export default StartCountdownModal;
