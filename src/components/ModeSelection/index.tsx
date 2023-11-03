import LoadingBlock from '@components/LoadingBlock';
import { LocalStorageKey } from '@enums/local-storage-key';
import { loadJson, removeJson } from '@helpers/local-storage';

import GameMain from '@components/Game';
import {
  DetectiveGame,
  DetectiveGamePhase,
  GameMode,
} from '@models/entities/game/detective-game';
import { setMode } from '@reducers/game';
import {
  socketGameGetFinalGameAsync,
  socketGameGetIndividualGameAsync,
  socketGameGetPreliminaryGameAsync,
} from '@reducers/socket-game/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import CharacterSelection from './CharacterSelection';
import DifficultySelection from './DifficultySelection';
import JoinRoom from './JoinRoom';
import MissionSelection from './MissionSelection';
import PreliminaryCharacterSelection from './PreliminaryCharacterSelection';

const ModeSelection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mode } = useAppSelector((state) => state.game);
  const { isConnected, game, side } = useAppSelector(
    (state) => state.socketGame,
  );

  useEffect(() => {
    if (!router.isReady) return;
    const gameInfo = loadJson<DetectiveGame>(LocalStorageKey.GAME);
    if (gameInfo?.[`${side}Phase`] === '遊戲結束') {
      removeJson(LocalStorageKey.GAME);
      router.push('/competition/game');
      return;
    }

    if (!gameInfo && mode === null) {
      router.push('/competition/game');
      return;
    }

    if (mode && gameInfo && mode !== gameInfo?.mode) {
      removeJson(LocalStorageKey.GAME);
    }

    if (!isConnected || !gameInfo) return;
    dispatch(setMode(gameInfo.mode));
  }, [dispatch, isConnected, mode, router, side]);

  useEffect(() => {
    if (mode !== GameMode.個人賽 || !isConnected) return;
    dispatch(socketGameGetIndividualGameAsync());
  }, [dispatch, isConnected, mode]);

  useEffect(() => {
    if (mode !== GameMode.校園初賽 || !isConnected) return;
    dispatch(socketGameGetPreliminaryGameAsync());
  }, [dispatch, isConnected, mode]);

  useEffect(() => {
    if (mode !== GameMode.決賽 || !isConnected || !game?.code) return;
    dispatch(socketGameGetFinalGameAsync());
  }, [dispatch, isConnected, mode, game?.code]);

  if (!isConnected) {
    return (
      <>
        <LoadingBlock />
        <h2 className='text-center'>連線中...</h2>
      </>
    );
  }

  if (mode === GameMode.個人賽) {
    switch (game?.[`${side}Phase`]) {
      case DetectiveGamePhase.選擇題型:
        return <MissionSelection />;
      case DetectiveGamePhase.選擇難度:
        return <DifficultySelection />;
      case DetectiveGamePhase.選擇登場角色:
        return <CharacterSelection />;
    }

    if (!game) return <LoadingBlock />;
    return <GameMain />;
  }

  if (mode === GameMode.校園初賽) {
    switch (game?.[`${side}Phase`]) {
      case DetectiveGamePhase.創建房間:
      case DetectiveGamePhase.選擇題型:
      case DetectiveGamePhase.選擇登場角色:
        return <PreliminaryCharacterSelection />;
    }

    if (!game) return <LoadingBlock />;
    return <GameMain />;
  }

  if (mode === GameMode.決賽) {
    switch (game?.[`${side}Phase`]) {
      case DetectiveGamePhase.創建房間:
      case DetectiveGamePhase.選擇題型:
      case DetectiveGamePhase.選擇登場角色:
        return <PreliminaryCharacterSelection />;
    }

    if (!game) return <JoinRoom />;
    return <GameMain />;
  }

  return <></>;
};

export default ModeSelection;
