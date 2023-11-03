/* eslint-disable @next/next/no-img-element */
import CoresBar from '@components/Game/GameHeader/CoresBar';
import PlayHPBar from '@components/Game/GameHeader/PlayHPBar';
import { mapSrcList } from '@fixtures/map';
import { timeFormat } from '@helpers/time';

import {
  DetectiveGame,
  DetectiveGamePhase,
} from '@models/entities/game/detective-game';
import bgTeamNameLeft from '@public/game-source/viewer/background/team-name-left.png';
import bgTeamNameRight from '@public/game-source/viewer/background/team-name-right.png';
import bgTimer from '@public/game-source/viewer/background/timer.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAppSelector from 'src/hook/useAppSelector';

const InfoBoard = () => {
  const { game } = useAppSelector((state) => state.socketGame);
  const {
    leftTeamName,
    rightTeamName,
    leftSide,
    rightSide,
    leftPhase,
    rightPhase,
    leftRemainingSeconds,
    params,
  } = game as DetectiveGame;
  const { mapType, mainMission } = params!;
  const currentSrcMap = mapSrcList.find((map) => map.type === mapType)!;
  const remainingSeconds = leftRemainingSeconds ?? 600;

  const [gameTimer, setGameTimer] = useState(remainingSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        leftPhase === DetectiveGamePhase.遊戲結束 ||
        rightPhase === DetectiveGamePhase.遊戲結束
      ) {
        clearInterval(timer);
        return;
      }
      setGameTimer((prevValue) => prevValue - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [leftPhase, rightPhase]);

  useEffect(() => {
    setGameTimer(remainingSeconds);
  }, [remainingSeconds]);

  return (
    <main className='viewer-info-board'>
      <article className='viewer-info-board__timer'>
        <Image
          className='viewer-info-board__background'
          src={bgTimer}
          alt='計時器背景'
        />
        {timeFormat(gameTimer)}
      </article>
      <main className='viewer-info-board__team-container'>
        <article className='viewer-info-board__team'>
          <section
            className='viewer-info-board__team-name'
            style={{
              fontSize:
                (leftTeamName?.length ?? 0) > 10
                  ? '1.5vw'
                  : (leftTeamName?.length ?? 0) > 5
                  ? '2vw'
                  : '3vw',
            }}
          >
            {leftTeamName}
            <Image
              className='viewer-info-board__background'
              src={bgTeamNameLeft}
              alt='左方隊伍名稱背景'
            />
          </section>
          <CoresBar
            currentMap={currentSrcMap}
            mainMission={mainMission}
            side='left'
          />
          {leftSide.map((character, index) => (
            <article className='viewer-info-board__player-info' key={character}>
              <img
                src={`/game-source/character-avatar/${character}.png`}
                alt={character}
              />
              <PlayHPBar playerOrder={index} />
            </article>
          ))}
        </article>
        <article className='viewer-info-board__team'>
          <section
            className='viewer-info-board__team-name'
            style={{
              fontSize:
                (rightTeamName?.length ?? 0) > 10
                  ? '1.5vw'
                  : (rightTeamName?.length ?? 0) > 5
                  ? '2vw'
                  : '3vw',
            }}
          >
            {rightTeamName}
            <Image
              className='viewer-info-board__background'
              src={bgTeamNameRight}
              alt='右方隊伍名稱背景'
            />
          </section>
          <CoresBar
            currentMap={currentSrcMap}
            mainMission={mainMission}
            side='right'
          />
          {rightSide.map((character, index) => (
            <article className='viewer-info-board__player-info' key={character}>
              <img
                src={`/game-source/character-avatar/${character}.png`}
                alt={character}
              />
              <PlayHPBar playerOrder={leftSide.length + index} />
            </article>
          ))}
        </article>
      </main>
    </main>
  );
};

export default InfoBoard;
