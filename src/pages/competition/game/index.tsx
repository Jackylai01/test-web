/* eslint-disable @next/next/no-img-element */
import { LocalStorageKey } from '@enums/local-storage-key';
import { removeJson } from '@helpers/local-storage';

import { GameMode } from '@models/entities/game/detective-game';
import { resetClientGameStatus } from '@reducers/client/game';
import { resetGameSetting, setMode } from '@reducers/game';
import { resetSocketGame } from '@reducers/socket-game';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';

const CompetitionGamePage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [pageWidth, setPageWidth] = useState<number>(0);

  useEffect(() => {
    setPageWidth(window.innerWidth);
    removeJson(LocalStorageKey.GAME);
    dispatch(resetClientGameStatus());
    dispatch(resetGameSetting());
    dispatch(resetSocketGame());
  }, [dispatch]);

  return (
    <main>
      <Link className='btn btn--border game-main__back' href='/competition'>
        上一頁
      </Link>
      <Link
        className='btn btn--border game-main__final'
        href='/competition/game/main'
        onClick={() => dispatch(setMode(GameMode.決賽))}
      >
        決賽
      </Link>
      <article className='game-main__container'>
        <img
          src='/game-source/background/main-background.png'
          width='100%'
          alt='主畫面背景'
        />
        <ul className='game-main__select-mode'>
          <li>
            <Link
              href='/competition/game/main'
              onClick={() => dispatch(setMode(GameMode.校園初賽))}
            ></Link>
          </li>
          <li>
            <Link
              href='/competition/game/main'
              onClick={() => dispatch(setMode(GameMode.個人賽))}
            />
          </li>
        </ul>
        {pageWidth ? (
          <ul
            className='game-main__select-page'
            style={{
              width: (pageWidth ?? 20) * 0.34,
              height: (pageWidth ?? 20) * 0.34,
              left: `calc(50% - ${((pageWidth ?? 20) * 0.35) / 2 + 'px'})`,
            }}
          >
            <li>
              <Link href='/competition/game/rank'></Link>
            </li>
            <li>
              <Link href='/competition/game/heart'></Link>
            </li>
          </ul>
        ) : null}
      </article>
    </main>
  );
};

export default CompetitionGamePage;
