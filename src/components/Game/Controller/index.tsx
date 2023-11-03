import { EventItem } from '@enums/event-item';
import { LocalStorageKey } from '@enums/local-storage-key';
import { MonsterType } from '@enums/monster-type';
import { checkMobileDevice } from '@helpers/check';
import { sideUpperCase } from '@helpers/game';
import { findRandomEmptyPosition } from '@helpers/gameMap';
import { saveJson } from '@helpers/local-storage';
import {
  DetectiveGame,
  DetectiveGamePhase,
} from '@models/entities/game/detective-game';
import action from '@public/game-source/icon/action.png';
import skillBar from '@public/game-source/icon/skill-bar.png';
import {
  GameModalType,
  setCoreType,
  setGameModalType,
  setMonsterType,
  setWandererOrder,
} from '@reducers/game';
import {
  socketGameEndGameAsync,
  socketGameStopOtherTeamAsync,
  socketGameUpdateCoreLogAsync,
  socketGameUpdateEventMapAsync,
  socketGameUpdateOneMonsterAsync,
  socketGameUpdateOnePlayerAsync,
} from '@reducers/socket-game/actions';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  characterName?: string;
  currentPosition: number[];
  currentDirection: string;
  skillCount: number;
  coolDownTime: number;
  isGameStart: boolean;
  playerHP: number;
  setCoolDownTimeOut: (time: number) => void;
  setPartialEventMap: (x: number, y: number, stateNumber: number) => void;
  setShowCoreBoot: Dispatch<SetStateAction<number[]>>;
  setShowTrap: Dispatch<SetStateAction<boolean>>;
};

const Controller = ({
  characterName,
  currentPosition,
  currentDirection,
  skillCount,
  coolDownTime,
  isGameStart,
  playerHP,
  setCoolDownTimeOut,
  setPartialEventMap,
  setShowCoreBoot,
  setShowTrap,
}: Props) => {
  const dispatch = useAppDispatch();

  const { game, side, playerOrder } = useAppSelector(
    (state) => state.socketGame,
  );
  const { params } = game as DetectiveGame;
  const phase = game?.[`${side}Phase`];
  const { eventMap, players, monsters, leftCoreList, rightCoreList } = params!;
  const coreList = params?.[`${side}CoreList`];

  const { monsterType, monstersPosition } = useAppSelector(
    (state) => state.game,
  );

  const [trackTargetCore, setTrackTargetCore] = useState<number | null>(null);

  // 操作目標核心追蹤
  useEffect(() => {
    if (!trackTargetCore) return;
    setShowCoreBoot([1, 600, trackTargetCore]);

    if (coreList?.includes(trackTargetCore)) {
      setTrackTargetCore(null);
    }

    setTrackTargetCore(null);
  }, [trackTargetCore, coreList, setShowCoreBoot]);

  const setEventMap = (newMap: number[][]) => {
    dispatch(socketGameUpdateEventMapAsync({ eventMap: newMap }));
  };

  const isWall = (y: number, x: number) =>
    (eventMap[y][x] === EventItem.WALL &&
      eventMap[y][x] !== EventItem.NEW_EMPTY) ||
    eventMap[y][x] === EventItem.OBSTACLE;

  const handlingEncounters = (x: number, y: number) => {
    const key = eventMap[x][y];

    switch (key) {
      case EventItem.CORE_1_LEFT:
      case EventItem.CORE_2_LEFT:
      case EventItem.CORE_3_LEFT:
      case EventItem.CORE_4_LEFT:
      case EventItem.CORE_5_LEFT:
      case EventItem.CORE_1_RIGHT:
      case EventItem.CORE_2_RIGHT:
      case EventItem.CORE_3_RIGHT:
      case EventItem.CORE_4_RIGHT:
      case EventItem.CORE_5_RIGHT:
        if (
          (side === 'left' && key > EventItem.CORE_5_LEFT) ||
          (side === 'right' && key < EventItem.CORE_1_RIGHT) ||
          leftCoreList.includes(key) ||
          rightCoreList.includes(key)
        ) {
          return;
        }
        saveJson(LocalStorageKey.Last_LOST_CORE, key);
        dispatch(setMonsterType(MonsterType.GUARDIAN));
        dispatch(setCoreType(key));
        dispatch(setGameModalType(GameModalType.怪物說明));
        dispatch(
          socketGameUpdateCoreLogAsync({
            core: key,
            position: currentPosition,
            playerOrder,
          }),
        );
        break;

      case EventItem.TRAP_LEFT:
        if (side === 'right') {
          dispatch(setMonsterType(MonsterType.IMPRISONER));
          dispatch(setGameModalType(GameModalType.怪物說明));
        }
        break;

      case EventItem.TRAP_RIGHT:
        if (side === 'left') {
          dispatch(setMonsterType(MonsterType.IMPRISONER));
          dispatch(setGameModalType(GameModalType.怪物說明));
        }
        break;

      case EventItem.TRAP:
        dispatch(setMonsterType(MonsterType.IMPRISONER));
        dispatch(setGameModalType(GameModalType.怪物說明));
        break;

      case EventItem.TIME_MACHINE_LEFT:
      case EventItem.TIME_MACHINE_RIGHT:
        if (key !== EventItem[`TIME_MACHINE_${sideUpperCase(side)}`]) return;
        dispatch(socketGameEndGameAsync({ winnerSide: side }));
        break;

      default:
        if (monstersPosition) {
          const currentWanderIndex = monstersPosition.findIndex(
            (monster) => monster.x === x && monster.y === y,
          );
          if (currentWanderIndex > -1 && monsters[currentWanderIndex].hp > 0) {
            dispatch(setMonsterType(MonsterType.WANDERER));
            dispatch(setWandererOrder(currentWanderIndex));
            dispatch(
              socketGameUpdateOneMonsterAsync({
                index: currentWanderIndex,
                monster: {
                  ...monsters[currentWanderIndex],
                  stopPosition: monstersPosition[currentWanderIndex],
                },
              }),
            );
            dispatch(setGameModalType(GameModalType.怪物說明));
          }
        }
        break;
    }

    if (key !== EventItem.NEW_EMPTY && key !== EventItem.EMPTY) {
      if (side === 'left' && key === EventItem.TRAP_LEFT) return;
      if (side === 'right' && key === EventItem.TRAP_RIGHT) return;
      setPartialEventMap(x, y, EventItem.EMPTY);
    }
  };

  const move = (direction: 'top' | 'bottom' | 'left' | 'right') => {
    const [x, y] = currentPosition;
    let nextPosition = currentPosition;
    const raceQuizOptions = {
      side,
      players,
      checkRaceQuiz: true,
    };

    setCoolDownTimeOut(350);
    switch (direction) {
      case 'top':
        if (y - 1 < 0) return;
        if (isWall(y - 1, x)) {
          if (currentDirection === direction) return;
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: {
                ...players[playerOrder],
                currentPosition,
                currentDirection: direction,
              },
              ...raceQuizOptions,
            }),
          );
          return;
        }
        handlingEncounters(y - 1, x);
        nextPosition = [x, y - 1];

        break;

      case 'bottom':
        if (y + 1 > 14) return;
        if (isWall(y + 1, x)) {
          if (currentDirection === direction) return;
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: {
                ...players[playerOrder],
                currentPosition,
                currentDirection: direction,
              },
              ...raceQuizOptions,
            }),
          );
          return;
        }
        handlingEncounters(y + 1, x);
        nextPosition = [x, y + 1];
        break;

      case 'left':
        if (x - 1 < 0) return;
        if (isWall(y, x - 1)) {
          if (currentDirection === direction) return;
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: {
                ...players[playerOrder],
                currentPosition,
                currentDirection: direction,
              },
              ...raceQuizOptions,
            }),
          );
          return;
        }
        handlingEncounters(y, x - 1);
        nextPosition = [x - 1, y];
        break;

      case 'right':
        if (x + 1 > 14) return;
        if (isWall(y, x + 1)) {
          if (currentDirection === direction) return;
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: {
                ...players[playerOrder],
                currentPosition,
                currentDirection: direction,
              },
              ...raceQuizOptions,
            }),
          );
          return;
        }
        handlingEncounters(y, x + 1);
        nextPosition = [x + 1, y];
        break;

      default:
        break;
    }

    dispatch(
      socketGameUpdateOnePlayerAsync({
        index: playerOrder,
        player: {
          ...players[playerOrder],
          currentPosition: nextPosition,
          currentDirection: direction,
        },
        ...raceQuizOptions,
      }),
    );
  };

  const skill = () => {
    if (skillCount === 0) return;
    const [x, y] = currentPosition;

    switch (characterName) {
      case '黎明舞者':
        const newEventMap: number[][] = JSON.parse(JSON.stringify(eventMap));
        let coresArray: number[] = [];
        newEventMap.forEach((row, rowIndex) =>
          row.forEach((colItem, colIndex) => {
            if (colItem < 30 && 19 < colItem) {
              coresArray.push(colItem);
              newEventMap[rowIndex][colIndex] = 0;
            }
          }),
        );

        coresArray.forEach((item) => {
          const [x, y] = findRandomEmptyPosition(newEventMap);
          newEventMap[x][y] = item;
        });

        setEventMap(newEventMap);
        break;

      case '漩渦遊俠':
        if (eventMap[y][x] !== EventItem.EMPTY) return;
        if (side === 'left') {
          setPartialEventMap(y, x, EventItem.TRAP_LEFT);
        } else {
          setPartialEventMap(y, x, EventItem.TRAP_RIGHT);
        }
        break;

      case '新葉魔導':
        // 暫停所有遊蕩者、對手，使其５秒無法移動。
        dispatch(socketGameStopOtherTeamAsync({ seconds: 5 }));
        break;

      case '寒冰女巫':
        let targetPosition: number[] = [];
        switch (currentDirection) {
          case 'top':
            if (y + 1 < 0) return;
            if (isWall(y + 1, x)) return;
            targetPosition = [y + 1, x];
            break;

          case 'bottom':
            if (y - 1 > 14) return;
            if (isWall(y - 1, x)) return;
            targetPosition = [y - 1, x];
            break;

          case 'left':
            if (x + 1 < 0) return;
            if (isWall(y, x + 1)) return;
            targetPosition = [y, x + 1];
            break;

          case 'right':
            if (x - 1 > 14) return;
            if (isWall(y, x - 1)) return;
            targetPosition = [y, x - 1];
            break;

          default:
            break;
        }

        setPartialEventMap(
          targetPosition[0],
          targetPosition[1],
          EventItem.OBSTACLE,
        );
        setTimeout(() => {
          setPartialEventMap(
            targetPosition[0],
            targetPosition[1],
            EventItem.EMPTY,
          );
        }, 5000);
        break;

      case '紅蓮法師':
        let targetCore: number = -10;

        eventMap.forEach((row) => {
          if (targetCore >= 20) return;

          row.forEach((item) => {
            if (side === 'left') {
              if (item >= 20 && item <= 24) {
                targetCore = item;
              }
            } else {
              if (item >= 25 && item <= 29) {
                targetCore = item;
              }
            }
          });
        });

        setTrackTargetCore(targetCore);
        break;

      case '綠影射手':
        let nextPosition = currentPosition;
        switch (currentDirection) {
          case 'top':
            if (y - 2 < 0) return;
            if (isWall(y - 2, x)) return;
            handlingEncounters(y - 2, x);
            nextPosition = [x, y - 2];
            break;

          case 'bottom':
            if (y + 2 > 14) return;
            if (isWall(y + 2, x)) return;
            handlingEncounters(y + 2, x);
            nextPosition = [x, y + 2];

            break;

          case 'left':
            if (x - 2 < 0) return;
            if (isWall(y, x - 2)) return;
            handlingEncounters(y, x - 2);
            nextPosition = [x - 2, y];
            break;

          case 'right':
            if (x + 2 > 14) return;
            if (isWall(y, x + 2)) return;
            handlingEncounters(y, x + 2);
            nextPosition = [x + 2, y];
            break;

          default:
            break;
        }

        dispatch(
          socketGameUpdateOnePlayerAsync({
            index: playerOrder,
            player: {
              ...players[playerOrder],
              currentPosition: nextPosition,
              currentDirection: currentDirection,
              skillCount: skillCount - 1,
            },
            isUpdateSkill: true,
          }),
        );
        return;
      case '碎石勇者':
        setShowCoreBoot([10, 5]);
        break;
      case '烈日劍士':
        setShowTrap(true);

        break;
      case '極凍戰斧':
        switch (currentDirection) {
          case 'top':
            if (y - 1 < 0) return;
            if (isWall(y - 1, x))
              setPartialEventMap(y - 1, x, EventItem.NEW_EMPTY);
            break;

          case 'bottom':
            if (y + 1 > 14) return;
            if (isWall(y + 1, x))
              setPartialEventMap(y + 1, x, EventItem.NEW_EMPTY);
            break;

          case 'left':
            if (x - 1 < 0) return;
            if (isWall(y, x - 1))
              setPartialEventMap(y, x - 1, EventItem.NEW_EMPTY);
            break;

          case 'right':
            if (x + 1 > 14) return;
            if (isWall(y, x + 1))
              setPartialEventMap(y, x + 1, EventItem.NEW_EMPTY);
            break;

          default:
            break;
        }

        break;

      default:
        break;
    }

    dispatch(
      socketGameUpdateOnePlayerAsync({
        index: playerOrder,
        player: {
          ...players[playerOrder],
          skillCount: skillCount - 1,
        },
        isUpdateSkill: true,
      }),
    );
  };

  const moveEvent = (event: KeyboardEvent) => {
    // 確認冷卻時間

    if (coolDownTime > 0 || monsterType || !isGameStart) return;
    if (
      game?.params?.[`${side}StopEndTime`] &&
      new Date() < new Date(game.params[`${side}StopEndTime`] as Date)
    ) {
      return;
    }

    switch (event.code) {
      case 'KeyA':
        (document.querySelector('#controller-left') as HTMLElement).click();
        break;
      case 'KeyD':
        (document.querySelector('#controller-right') as HTMLElement).click();
        break;
      case 'KeyW':
        (document.querySelector('#controller-top') as HTMLElement).click();
        break;
      case 'KeyS':
        (document.querySelector('#controller-bottom') as HTMLElement).click();
        break;

      case 'Space':
        (document.querySelector('#controller-skill') as HTMLElement).click();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (phase === DetectiveGamePhase.遊戲結束) return;
    if (playerHP === 0) return;
    window.addEventListener('keydown', moveEvent);

    return () => {
      window.removeEventListener('keydown', moveEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monsterType, coolDownTime, params, isGameStart, playerHP]);

  // 模擬操作用函示
  // const testCore = () => {
  //   const [x, y] = findSpecifiedState(eventMap);
  //   handlingEncounters(x, y);
  // };
  return (
    <>
      <section className='game-board__skill-bar'>
        <Image priority src={skillBar} alt='技能文字' width={324} height={50} />
        {new Array(skillCount).fill('').map((_item, index) => (
          <Image
            key={index}
            priority
            src={action}
            alt='技能符號'
            width={52}
            height={60}
          />
        ))}
      </section>
      <footer
        className={`game-board__controller${
          checkMobileDevice() ? ' show' : ''
        }`}
      >
        <ul className='game-board__controller-direction'>
          <li id='controller-top' onClick={() => move('top')}></li>
          <li id='controller-bottom' onClick={() => move('bottom')}></li>
          <li id='controller-left' onClick={() => move('left')}></li>
          <li id='controller-right' onClick={() => move('right')}></li>
        </ul>

        <aside
          id='controller-skill'
          className='game-board__controller-skill'
          onClick={() => skill()}
        >
          SKILL
        </aside>
      </footer>
    </>
  );
};

export default Controller;
