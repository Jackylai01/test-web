import NoSSR from '@components/NoSSR';
import EndBillboard from '@components/ViewerGame/EndBillboard';
import { characterSrcList } from '@fixtures/character';
import { mapSrcList } from '@fixtures/map';

import GameModal from '@components/Game/GameModal';
import MapItem from '@components/Game/MapItem';
import Monsters from '@components/Game/Monsters';
import {
  DetectiveGame,
  DetectiveGamePhase,
  GameMode,
} from '@models/entities/game/detective-game';
import { GameModalType, setGameModalType } from '@reducers/game';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import InfoBoard from './InfoBoard';

const ViewerGame = () => {
  const dispatch = useAppDispatch();
  const { modalType } = useAppSelector((state) => state.game);
  const { game } = useAppSelector((state) => state.socketGame);
  const { leftPhase, rightPhase, params } = game as DetectiveGame;
  const allCharacters = game?.['leftSide'].concat(game?.['rightSide']) ?? [];
  const { mapType, mapOrderKey, eventMap, players, monsters } = params!;
  const currentSrcMap = mapSrcList.find((map) => map.type === mapType);

  const [gridSize, setGridSize] = useState<number>(0);

  useEffect(() => {
    const resetGridSize = () => setGridSize((window.innerWidth - 40) / 29.5);
    const preventTouchStartEvent = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    resetGridSize();

    // 鎖定畫面放大縮小用
    window.addEventListener('resize', resetGridSize);
    document.documentElement.addEventListener(
      'touchstart',
      preventTouchStartEvent,
      { passive: false },
    );
    return () => {
      window.removeEventListener('resize', resetGridSize);
      document.documentElement.removeEventListener(
        'touchstart',
        preventTouchStartEvent,
      );
    };
  }, []);

  useEffect(() => {
    if (
      leftPhase !== DetectiveGamePhase.遊戲結束 ||
      rightPhase !== DetectiveGamePhase.遊戲結束
    ) {
      return;
    }
    dispatch(setGameModalType(GameModalType.遊戲結果));
  }, [dispatch, leftPhase, rightPhase]);

  return (
    <article className='game-board'>
      <Head>
        <meta
          name='viewport'
          content='width = device-width,inital-scale=1.0,maximun = 1.0,user-scalable = no'
        />
      </Head>
      <InfoBoard />
      <GameModal isOpen={modalType === GameModalType.遊戲結果}>
        <EndBillboard />
      </GameModal>
      <main
        className='game-board__map'
        style={{
          right: '15px',
          //   transform: `translate3D(${
          //     (currentPosition[0] - 7) * -gridSize + 'px'
          //   },${(currentPosition[1] - 7) * -gridSize + 'px'},0)`,
        }}
      >
        <NoSSR>
          {/* 操作其他角色移動 輸入 x,y 軸的參數與角色名稱與方向 */}
          {game?.mode !== GameMode.個人賽 && (
            <ul className='game-board__other-player'>
              {players.map((player, index) => (
                <li
                  key={index}
                  className={
                    (index < allCharacters.length / 2 ? 'left' : 'right') +
                    (player.hp === 0 ? ' dead' : '')
                  }
                  style={{
                    transform: `translate3D(${
                      player.currentPosition[0] * gridSize + 'px'
                    },${
                      player.currentPosition[1] * gridSize -
                      gridSize * 0.2 +
                      'px'
                    },0)`,
                    width: gridSize,
                    height: gridSize * 1.2,
                  }}
                >
                  <Image
                    className={
                      index < allCharacters.length / 2 ? 'left' : 'right'
                    }
                    src={
                      characterSrcList.find(
                        (character) => character.name === allCharacters[index],
                      )?.[
                        `avatar${
                          index < allCharacters.length / 2 ? 'Left' : 'Right'
                        }`
                      ] || ''
                    }
                    alt='其他玩家角色'
                    priority
                  />
                </li>
              ))}
            </ul>
          )}
          {!!monsters.find((monster) => monster.hp > 0) && (
            <Monsters monsters={monsters} gridSize={gridSize} />
          )}
          {currentSrcMap && (
            <ol className='game-board__event-map'>
              {eventMap.map((arrayItem, index) => (
                <li key={index}>
                  <ol className='map__items'>
                    {arrayItem.map((item, i) => (
                      <li key={`${item}${i}`}>
                        <MapItem
                          state={item}
                          showTrap={true}
                          currentSrcMap={currentSrcMap}
                        />
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          )}
        </NoSSR>
        {currentSrcMap && (
          <Image
            style={{ width: '50vw', height: '50vw' }}
            src={currentSrcMap.mapSrc[mapOrderKey]}
            alt='主地圖'
            priority
          />
        )}
      </main>
    </article>
  );
};

export default ViewerGame;
