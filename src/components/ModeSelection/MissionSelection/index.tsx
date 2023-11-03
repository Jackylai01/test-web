import { DetectiveQuizCategoryList } from '@models/entities/game/detective-game';
import aside from '@public/game-source/mission-roulette/aside.png';
import button from '@public/game-source/mission-roulette/button.png';
import header from '@public/game-source/mission-roulette/header.png';
import main from '@public/game-source/mission-roulette/main.png';
import remainingTimes_0 from '@public/game-source/mission-roulette/remaining-times_0.png';
import remainingTimes_1 from '@public/game-source/mission-roulette/remaining-times_1.png';
import remainingTimes_2 from '@public/game-source/mission-roulette/remaining-times_2.png';
import remainingTimes_3 from '@public/game-source/mission-roulette/remaining-times_3.png';
import top from '@public/game-source/mission-roulette/top.png';
import triangle from '@public/game-source/mission-roulette/triangle.png';
import { socketGameSetMissionAsync } from '@reducers/socket-game/actions';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import CompletionTips from '../CompletionTips';

const CompetitionGamePersonalMissionPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    gameInfo,
    status: { gameInfoLoading },
  } = useAppSelector((state) => state.clientGame);

  const [currentMission, setCurrentMission] = useState<number>(0);

  const getMission = () => {
    let currentTarget;

    if (currentMission >= 0) {
      currentTarget = currentMission % 14;
    } else {
      currentTarget = Math.abs(14 + (currentMission % 14));
      if (currentTarget === 14) currentTarget = 0;
    }
    return DetectiveQuizCategoryList[currentTarget];
  };

  const selectMission = () => {
    dispatch(
      socketGameSetMissionAsync({
        stage: getMission(),
      }),
    );
  };

  return (
    <main className='game-main game-main--linear-background'>
      <article className='game-main__container game-main__container--border'>
        <Link
          className='btn btn--border game-main__back'
          href='/competition/game'
          legacyBehavior
        >
          上一頁
        </Link>
        <CompletionTips currentMission={getMission()} />
        <section className='mission-roulette'>
          <header className='mission-roulette__header'>
            <Image src={top} alt='輪盤上部分' />
          </header>
          <article className='mission-roulette__main'>
            <section className='mission-roulette__main-top'>
              <Image src={header} alt='輪盤頂部' />
            </section>
            <section className='mission-roulette__main-triangle'>
              <Image
                src={triangle}
                alt='輪盤三角'
                onClick={() => setCurrentMission(currentMission - 1)}
              />
              <Image
                src={triangle}
                alt='輪盤三角'
                onClick={() => setCurrentMission(currentMission + 1)}
              />
            </section>
            <section
              className='mission-roulette__main-roulette'
              style={{ transform: `rotate(${currentMission * -25.714}deg)` }}
            >
              <Image src={main} alt='輪盤主體' />
            </section>
          </article>
          <aside className='mission-roulette__aside'>
            <Image src={aside} alt='輪盤側欄' />
            <ul className='mission-roulette__aside-remaining'>
              <li>
                <Image src={remainingTimes_0} alt='剩餘次數技術區塊_0' />
              </li>
              {(gameInfo?.gameCount || 0) >= 1 && (
                <li>
                  <Image src={remainingTimes_1} alt='剩餘次數技術區塊_1' />
                </li>
              )}
              {(gameInfo?.gameCount || 0) >= 2 && (
                <li>
                  <Image src={remainingTimes_2} alt='剩餘次數技術區塊_2' />
                </li>
              )}
              {(gameInfo?.gameCount || 0) >= 3 && (
                <li>
                  <Image src={remainingTimes_3} alt='剩餘次數技術區塊_3' />
                </li>
              )}
            </ul>
          </aside>
          <footer className='mission-roulette__select-trigger'>
            <Image src={button} alt='開始按鈕' onClick={selectMission} />
          </footer>
        </section>
      </article>
    </main>
  );
};

export default CompetitionGamePersonalMissionPage;
