import { timeFormat } from '@helpers/time';

import {
  DetectiveGame,
  DetectiveGamePhase,
} from '@models/entities/game/detective-game';
import {
  socketGameCheckLostCoresAsync,
  socketGameEndGameAsync,
  socketGameGetTimeAsync,
} from '@reducers/socket-game/actions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  showCoreBoot: number[];
  setShowCoreBoot: Dispatch<SetStateAction<number[]>>;
};

const GameTimer = ({ showCoreBoot, setShowCoreBoot }: Props) => {
  const dispatch = useAppDispatch();

  const { game, side, playerOrder } = useAppSelector(
    (state) => state.socketGame,
  );
  const { mode } = game as DetectiveGame;
  const phase = game?.[`${side}Phase`];
  const remainingSeconds = game?.[`${side}RemainingSeconds`] ?? 600;

  const [gameTimer, setGameTimer] = useState(remainingSeconds);
  const [coreCheckCount, setCoreCheckCount] = useState(0);

  const isEndGame = phase === DetectiveGamePhase.遊戲結束;
  const isLeader = playerOrder === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer((prevValue) => prevValue - 1);
    }, 1000);

    const syncTimer = setInterval(() => {
      dispatch(socketGameGetTimeAsync());
      setCoreCheckCount((prevValue) => (prevValue = prevValue + 1));
    }, 20000);

    if (!isLeader) {
      clearInterval(syncTimer);
    }

    if (isEndGame) {
      clearInterval(timer);
      clearInterval(syncTimer);
    }

    return () => {
      clearInterval(timer);
      clearInterval(syncTimer);
    };
  }, [coreCheckCount, dispatch, isEndGame, isLeader]);

  useEffect(() => {
    setGameTimer(remainingSeconds);
  }, [remainingSeconds]);

  useEffect(() => {
    if (coreCheckCount % 3 !== 0) return;
    dispatch(socketGameCheckLostCoresAsync());
  }, [coreCheckCount, dispatch]);

  useEffect(() => {
    if (gameTimer <= 120 && showCoreBoot[0] === 0) {
      setShowCoreBoot([10, 120]);
    }
    if (gameTimer > 0 || !isLeader || isEndGame) return;
    dispatch(socketGameEndGameAsync());
  }, [dispatch, gameTimer, isEndGame, isLeader, setShowCoreBoot, showCoreBoot]);

  return (
    <span className='game-board__header-timer'>{timeFormat(gameTimer)}</span>
  );
};

export default GameTimer;
