import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGameDetailGameInfo,
  apiGameFinishAllStages,
  apiGameGetRanking,
  apiInitFinalGame,
  apiListTeams,
} from '@services/client/game/client-game';

export enum ClientGameAsyncAction {
  gameInfo = 'gameInfo',
  gameRanking = 'gameRanking',
  finishAllStage = 'finishAllStage',
  teamList = 'teamList',
  initFinalGame = 'initFinalGame',
}

export const clientGameGameInfoAsync = createAsyncThunk(
  `${ReducerName.CLIENT_GAME}/${ClientGameAsyncAction.gameInfo}`,
  async () => {
    const response = await apiGameDetailGameInfo();
    return response.result.data;
  },
);

export const clientGameGameRankingAsync = createAsyncThunk(
  `${ReducerName.CLIENT_GAME}/${ClientGameAsyncAction.gameRanking}`,
  async () => {
    const response = await apiGameGetRanking();
    return response.result.data;
  },
);

export const clientGameFinishAllStagesAsync = createAsyncThunk(
  `${ReducerName.CLIENT_GAME}/${ClientGameAsyncAction.finishAllStage}`,
  async () => {
    const response = await apiGameFinishAllStages();
    return response.result.data;
  },
);

export const clientGamTeamListAsync = createAsyncThunk(
  `${ReducerName.CLIENT_GAME}/${ClientGameAsyncAction.teamList}`,
  async (schoolCode: string | null) => {
    const response = await apiListTeams(schoolCode);
    return response.result.data;
  },
);

export const clientGameInitFinalGameAsync = createAsyncThunk(
  `${ReducerName.CLIENT_GAME}/${ClientGameAsyncAction.initFinalGame}`,
  async (data: { leftTeamId: string; rightTeamId: string }) => {
    const response = await apiInitFinalGame(data);
    return response.result.data;
  },
);
