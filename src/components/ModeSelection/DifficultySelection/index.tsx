import {
  missionListImage,
  rankListImage,
  rankTimeListImage,
} from '@fixtures/game';

import { DetectiveQuizCategoryList } from '@models/entities/game/detective-game';
import arrow from '@public/game-source/difficulty-machine/arrow.png';
import info from '@public/game-source/difficulty-machine/info.png';
import main from '@public/game-source/difficulty-machine/main.png';
import startBtn from '@public/game-source/difficulty-machine/start-btn.png';
import {
  socketGameResetMissionAsync,
  socketGameSetDifficultyAsync,
} from '@reducers/socket-game/actions';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import CompletionTips from '../CompletionTips';

const CompetitionGamePersonalDifficultyPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const { game } = useAppSelector((state) => state.socketGame);

  // 可能直接以最高難度遊玩
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(
    game?.level ?? 1,
  );

  const selectDifficulty = () => {
    dispatch(socketGameSetDifficultyAsync({ level: currentDifficulty }));
  };

  const editCurrentDifficulty = (value: number) => {
    let newValue = currentDifficulty + value;
    newValue = newValue % 4 >= 1 ? newValue % 4 : 1;
    setCurrentDifficulty(newValue);
  };

  return (
    <main className='game-main game-main--linear-background'>
      <article className='game-main__container game-main__container--border game-main__container--border-pure-bg'>
        <span
          className='btn btn--border game-main__back'
          onClick={() => dispatch(socketGameResetMissionAsync())}
        >
          上一頁
        </span>
        {game?.category && <CompletionTips currentMission={game?.category} />}
        <section className='difficulty-machine'>
          <main className='difficulty-machine__main'>
            <header className='difficulty-machine__header'>
              <Image
                src={
                  missionListImage[
                    DetectiveQuizCategoryList.findIndex(
                      (item) => game?.category === item,
                    )
                  ]
                }
                alt='控制面板'
              />
              <ul className='difficulty-machine__array'>
                <li>
                  <Image
                    src={arrow}
                    alt='箭頭'
                    onClick={() => editCurrentDifficulty(-1)}
                  />
                </li>
                <li>
                  <Image
                    src={arrow}
                    alt='箭頭'
                    onClick={() => editCurrentDifficulty(1)}
                  />
                </li>
                <li>
                  <Image src={info} alt='難度' />
                </li>
              </ul>
              <section className='difficulty-machine__difficulty'>
                <Image
                  src={rankListImage[currentDifficulty - 1]}
                  alt='當前等級'
                />
              </section>
              <section className='difficulty-machine__rank'>
                <Image
                  src={rankTimeListImage[currentDifficulty - 1]}
                  alt='時間'
                />
              </section>
            </header>

            <Image
              src={main}
              alt='控制面板'
              className='difficulty-machine__image'
            />
          </main>
          <footer className='difficulty-machine__select-trigger'>
            <Image src={startBtn} alt='開始按鈕' onClick={selectDifficulty} />
          </footer>
        </section>
      </article>
    </main>
  );
};

export default CompetitionGamePersonalDifficultyPage;
