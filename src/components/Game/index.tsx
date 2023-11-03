import NoSSR from '@components/NoSSR';
import { LocalStorageKey } from '@enums/local-storage-key';
import { MonsterType } from '@enums/monster-type';
import { characterSrcList } from '@fixtures/character';
import { mapSrcList } from '@fixtures/map';
import { getBehaviorPattern } from '@helpers/game';
import { checkOrderState, findRandomEmptyPosition } from '@helpers/gameMap';
import { loadJson, removeJson, saveJson } from '@helpers/local-storage';

import {
  DetectiveGame,
  DetectiveGameParamsPlayer,
  DetectiveGamePhase,
  GameMode,
} from '@models/entities/game/detective-game';
import {
  AnswerResultType,
  GameModalType,
  setAnswerCorrectCounter,
  setAnswerResultType,
  setGameModalType,
  setIsAnswerTimeout,
  setMonsterType,
} from '@reducers/game';
import {
  socketGamePartialUpdateEventMapAsync,
  socketGameUpdateOneMonsterAsync,
  socketGameUpdateOnePlayerAsync,
} from '@reducers/socket-game/actions';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import AnswerRecords from './AnswerRecords';
import AnswerResult from './AnswerResult';
import AttackEffect from './AttackEffect';
import Controller from './Controller';
import CoreBoot from './CoreBoot';
import DoctorMessage from './DoctorMessage';
import EndBillboard from './EndBillboard';
import GameHeader from './GameHeader';
import GameModal from './GameModal';
import MainBillboard from './MainBillboard';
import MapItem from './MapItem';
import Monsters from './Monsters';
import OperationGuide from './OperatingGuide';
import QuestionBoard from './QuestionBoard';
import StartCountdownModal from './StartCountdownModal';

const GameMain = () => {
  const dispatch = useAppDispatch();

  const { game, side, teamOrder, playerOrder } = useAppSelector(
    (state) => state.socketGame,
  );
  const { mode, params } = game as DetectiveGame;
  const phase = game?.[`${side}Phase`];
  const teamCharacters = game?.[`${side}Side`] ?? [];
  const enemyCharacters =
    game?.[`${side === 'left' ? 'right' : 'left'}Side`] ?? [];
  const allCharacters =
    side === 'left'
      ? [...teamCharacters, ...enemyCharacters]
      : [...enemyCharacters, ...teamCharacters];
  const { mapType, mapOrderKey, eventMap, mainMission, players, monsters } =
    params!;
  const currentSrcMap = mapSrcList.find((map) => map.type === mapType);
  const {
    modalType,
    monsterType,
    wandererOrder,
    isGameStart,
    isAnswering,
    answerResultType,
  } = useAppSelector((state) => state.game);

  const characterName = teamCharacters[teamOrder];
  const character = characterSrcList.find(
    (character) => character.name === characterName,
  );
  const {
    currentPosition,
    currentDirection,
    skillCount,
    hp: playerHP,
    isRaceQuiz,
  } = players[playerOrder] ?? new DetectiveGameParamsPlayer();
  const [gridSize, setGridSize] = useState<number>(0);

  const [coolDownTime, setCoolDownTime] = useState<number>(0);
  const [showTrap, setShowTrap] = useState<boolean>(
    characterName === '烈日劍士' && skillCount === 0 ? true : false,
  );
  const [showCoreBoot, setShowCoreBoot] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (phase !== DetectiveGamePhase.遊戲結束) return;
    dispatch(setGameModalType(GameModalType.遊戲結果));
    saveJson<DetectiveGame>(LocalStorageKey.GAME, game!);
    removeJson(LocalStorageKey.ROOM_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (!isGameStart) return;
    if (playerHP <= 0) {
      dispatch(setGameModalType(GameModalType.死亡說明));
    }
  }, [dispatch, isGameStart, playerHP]);

  useEffect(() => {
    if (!isGameStart) return;
    if (!isRaceQuiz) {
      if (
        modalType === GameModalType.怪物問題 &&
        monsterType === MonsterType.RACE_QUIZ &&
        answerResultType !== AnswerResultType.搶答成功
      ) {
        dispatch(setGameModalType(GameModalType.答題結果));
        dispatch(setMonsterType(null));
        dispatch(setAnswerResultType(AnswerResultType.搶答失敗));
      }
      return;
    }

    dispatch(setGameModalType(GameModalType.怪物問題));
    dispatch(setMonsterType(MonsterType.RACE_QUIZ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameStart, isRaceQuiz]);

  useEffect(() => {
    if (!isAnswering || monsterType === MonsterType.GUARDIAN) return;

    const countdown = monsterType === MonsterType.WANDERER ? 20000 : 5000;
    const timer = setTimeout(() => {
      dispatch(setIsAnswerTimeout(true));

      if (
        monsterType === MonsterType.WANDERER &&
        wandererOrder &&
        monsters[wandererOrder].hp <= 0
      ) {
        dispatch(setAnswerResultType(AnswerResultType.遭受攻擊));
        dispatch(setGameModalType(GameModalType.攻擊特效));
        dispatch(setMonsterType(null));
        updateWanderPosition();
        dispatch(setAnswerCorrectCounter(0));
        setCoolDownTimeOut(5000);
        clearTimeout(timer);
      }
    }, countdown);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnswering]);

  const setPartialEventMap = (x: number, y: number, stateNumber: number) => {
    dispatch(socketGamePartialUpdateEventMapAsync({ x, y, stateNumber }));
  };

  const updateWanderPosition = () => {
    if (wandererOrder === null) return;
    const newMonster = {
      ...monsters[wandererOrder],
      behaviorPattern: getBehaviorPattern(
        findRandomEmptyPosition(eventMap),
        eventMap,
      ),
      stopPosition: undefined,
    };
    dispatch(
      socketGameUpdateOneMonsterAsync({
        index: wandererOrder,
        monster: newMonster,
      }),
    );
  };

  const setCoolDownTimeOut = useCallback(
    (time: number) => {
      // 設置冷卻時間
      setCoolDownTime((prevValue) => prevValue + time);

      setTimeout(() => {
        setCoolDownTime(0);
      }, coolDownTime + time);
    },
    [coolDownTime],
  );

  useEffect(() => {
    const lastLostCore = Number(loadJson(LocalStorageKey.Last_LOST_CORE));
    if (lastLostCore) {
      if (!checkOrderState(eventMap, lastLostCore)) {
        const [x, y] = findRandomEmptyPosition(eventMap);
        lastLostCore && setPartialEventMap(x, y, Number(lastLostCore));
      }
      removeJson(LocalStorageKey.Last_LOST_CORE);
      dispatch(
        socketGameUpdateOnePlayerAsync({
          index: playerOrder,
          player: {
            ...players[playerOrder],
            isAnswering: false,
            isRaceQuiz: false,
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resetGridSize = () => setGridSize((window.innerHeight - 40) / 4);
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

  return (
    <article className='game-board'>
      <Head>
        <meta
          name='viewport'
          content='width = device-width,inital-scale=1.0,maximun = 1.0,user-scalable = no'
        />
      </Head>
      {currentSrcMap && (
        <GameHeader
          currentMap={currentSrcMap}
          mainMission={mainMission}
          headerBackground={currentSrcMap.headerSrc}
          showCoreBoot={showCoreBoot}
          setShowCoreBoot={setShowCoreBoot}
        />
      )}
      <GameModal isOpen={!!modalType}>
        {modalType === GameModalType.主要任務 &&
          (mode === GameMode.決賽 ? (
            <StartCountdownModal />
          ) : (
            currentSrcMap && (
              <MainBillboard
                currentMap={currentSrcMap}
                mainMission={mainMission}
              />
            )
          ))}
        {modalType === GameModalType.遊戲說明 && (
          <DoctorMessage messageType='gameGuide' />
        )}
        {modalType === GameModalType.操作說明 && <OperationGuide />}
        {modalType === GameModalType.怪物說明 && monsterType && (
          <DoctorMessage messageType={monsterType} />
        )}
        {modalType === GameModalType.怪物問題 && monsterType && (
          <QuestionBoard
            setCoolDownTimeOut={setCoolDownTimeOut}
            setPartialEventMap={setPartialEventMap}
          />
        )}
        {modalType === GameModalType.答題結果 && answerResultType && (
          <AnswerResult mainMission={mainMission} />
        )}
        {modalType === GameModalType.死亡說明 && (
          <DoctorMessage messageType='deadGuide' />
        )}
        {modalType === GameModalType.遊戲結果 && <EndBillboard />}
        {modalType === GameModalType.答題回顧 && <AnswerRecords />}
      </GameModal>
      {modalType === GameModalType.攻擊特效 && <AttackEffect />}
      <span
        className={`game-board__main-character${
          playerHP === 0 ? ' game-board__main-character--dead' : ''
        }`}
      >
        {character && (
          <Image
            priority
            src={character.animation[currentDirection]}
            alt={`${character.name}角色`}
            width={gridSize}
            height={gridSize * 1.2}
          />
        )}
        <NoSSR>
          <CoreBoot
            showCoreBoot={showCoreBoot}
            setShowCoreBoot={setShowCoreBoot}
          />
        </NoSSR>
      </span>
      <main
        className='game-board__map'
        style={{
          transform: `translate3D(${
            (currentPosition[0] - 7) * -gridSize + 'px'
          },${(currentPosition[1] - 7) * -gridSize + 'px'},0)`,
        }}
      >
        <NoSSR>
          {/* 操作其他角色移動 輸入 x,y 軸的參數與角色名稱與方向 */}
          {mode !== GameMode.個人賽 && (
            <ul className='game-board__other-player'>
              {players.map((player, index) =>
                index !== playerOrder && player ? (
                  <li
                    key={index}
                    className={player.hp === 0 ? 'dead' : undefined}
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
                      priority
                      src={
                        characterSrcList.find(
                          (character) =>
                            character.name === allCharacters[index],
                        )?.animation[player.currentDirection]
                      }
                      alt='其他玩家角色'
                      style={
                        (side === 'left' && index >= teamCharacters.length) ||
                        (side === 'right' && index < enemyCharacters.length)
                          ? { opacity: 0.5 }
                          : undefined
                      }
                    />
                  </li>
                ) : null,
              )}
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
                          showTrap={showTrap}
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
            priority
            src={currentSrcMap.mapSrc[mapOrderKey]}
            alt='主地圖'
            width={gridSize * 15}
            height={gridSize * 15}
          />
        )}
      </main>
      <Controller
        characterName={characterName}
        currentPosition={currentPosition}
        currentDirection={currentDirection}
        skillCount={skillCount}
        coolDownTime={coolDownTime}
        isGameStart={isGameStart}
        playerHP={playerHP}
        setCoolDownTimeOut={setCoolDownTimeOut}
        setPartialEventMap={setPartialEventMap}
        setShowCoreBoot={setShowCoreBoot}
        setShowTrap={setShowTrap}
      />
    </article>
  );
};

export default GameMain;
