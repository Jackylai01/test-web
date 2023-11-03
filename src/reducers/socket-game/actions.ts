import { EventItem } from '@enums/event-item';
import { ReducerName } from '@enums/reducer-name';
import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';
import { Monster } from '@helpers/game';
import {
  DetectiveGameParamsPlayer,
  DetectiveQuizCategory,
} from '@models/entities/game/detective-game';
import { AppState } from '@models/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '@store/middleware/socketGame';

export enum SocketGameAction {
  getIndividualGame = 'getIndividualGame',
  getPreliminaryGame = 'getPreliminaryGame',
  getFinalGame = 'getFinalGame',
  getFinalGamePublic = 'getFinalGamePublic',
  joinRoom = 'joinRoom',
  syncMission = 'syncMission',
  setMission = 'setMission',
  resetMission = 'resetMission',
  setDifficulty = 'setDifficulty',
  resetDifficulty = 'resetDifficulty',
  syncCharacter = 'syncCharacter',
  setCharacter = 'setCharacter',
  getQuiz = 'getQuiz',
  answerQuiz = 'answerQuiz',
  updateCurrentMap = 'updateCurrentMap',
  updateEventMap = 'updateEventMap',
  updatePartialEventMap = 'updatePartialEventMap',
  updateMainMission = 'updateMainMission',
  updateMonsters = 'updateMonsters',
  updateOneMonster = 'updateOneMonster',
  updateCoreList = 'updateCoreList',
  updateCoreLog = 'updateCoreLog',
  removeCoreLog = 'removeCoreLog',
  updatePlayers = 'updatePlayers',
  updateOnePlayer = 'updateOnePlayer',
  stopOtherTeam = 'stopOtherTeam',
  syncPayload = 'syncPayload',
  addTime = 'addTime',
  getTime = 'getTime',
  checkLostCores = 'checkLostCores',
  endGame = 'endGame',
}

const getStateGameId = (getState: () => unknown) =>
  (getState() as AppState).socketGame.game?._id;

/** [個人賽] 取得遊戲資訊 */
export const socketGameGetIndividualGameAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getIndividualGame}`,
  async () => {
    socket.emit('getIndividualGame');
  },
);

/** [校園初賽] 取得遊戲資訊 */
export const socketGameGetPreliminaryGameAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getPreliminaryGame}`,
  async () => {
    socket.emit('getPreliminaryGame');
  },
);

/** [決賽] 取得遊戲資訊 */
export const socketGameGetFinalGameAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getFinalGame}`,
  async (codeParam: string | undefined, { getState }) => {
    const code = codeParam ?? (getState() as any).socketGame.game.code;
    socket.emit('getFinalGame', { code: Number(code) });
  },
);

/** [決賽觀賽] 取得遊戲資訊 */
export const socketGameGetFinalGamePublicAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getFinalGamePublic}`,
  async (codeParam: string | undefined, { getState }) => {
    const code = codeParam ?? (getState() as any).socketGame.game.code;
    socket.emit('getFinalGamePublic', { code: Number(code) });
  },
);

/** [校園初賽] 完成加入房間 => 題型選擇 */
export const socketGameJoinRoomAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.joinRoom}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('joinRoomDone', { gameId });
  },
);

/** [校園初賽] 同步題型選擇給隊友 */
export const socketGameSyncMissionAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.syncMission}`,
  async (data: { stage: DetectiveQuizCategory }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('syncStage', { ...data, gameId });
  },
);

/** 完成題型選擇 => 選擇難度 */
export const socketGameSetMissionAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.setMission}`,
  async (data: { stage: DetectiveQuizCategory }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('selectStageDone', { ...data, gameId });
  },
);

/** 返回題型選擇 */
export const socketGameResetMissionAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.resetMission}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('backToSelectStage', { gameId });
  },
);

/** [個人賽] 完成難度選擇 => 角色選擇 */
export const socketGameSetDifficultyAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.setDifficulty}`,
  async (data: { level: number }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('selectLevelDone', { ...data, gameId });
  },
);

/** [個人賽] 返回難度選擇 */
export const socketGameResetDifficultyAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.setDifficulty}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('backToSelectLevel', { gameId });
  },
);

/** [校園初賽] 同步題型選擇給隊友 */
export const socketGameSyncCharacterAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.syncCharacter}`,
  async (data: { character: string }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('syncCharacter', { ...data, gameId });
  },
);

/** [個人賽] 完成角色選擇 => 開始遊戲 */
export const socketGameSetCharacterAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.setCharacter}`,
  async (data: { character: string }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('selectCharacterDone', { ...data, gameId });
  },
);

/** 抽題目 */
export const socketGameGetQuizAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getQuiz}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('getQuiz', { gameId });
  },
);

/** 答題目 */
export const socketGameAnswerQuizAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.answerQuiz}`,
  async (
    data: {
      // 有可能同時答題 (同時遇敵)，quizIndex 需紀錄在 payload 中來識別是誰在答哪一題
      quizIndex: number;
      answer: number;
      core?: EventItem | null;
    },
    { getState },
  ) => {
    const gameId = getStateGameId(getState);
    socket.emit('answerQuiz', { ...data, gameId });
  },
);

/** 初始化遊蕩者 */
export const socketGameUpdateMonstersAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateMonsters}`,
  async (data: { monsters: Monster[] }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateMonsters', { ...data, gameId });
  },
);

/** [用 updateMonsters 改的] 更新單一遊蕩者 */
export const socketGameUpdateOneMonsterAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateOneMonster}`,
  async (data: { index: number; monster: Monster }, { getState }) => {
    const gameId = getStateGameId(getState);
    const oldMonsters = (getState() as any).socketGame.game.params
      .monsters as Monster[];
    const monsters = oldMonsters.map((monster, index) =>
      index === data.index ? data.monster : monster,
    );
    socket.emit('updateMonsters', { ...{ monsters }, gameId });
  },
);

/** 初始化原始地圖 */
export const socketGameUpdateCurrentMapAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateCurrentMap}`,
  async (data: { currentMap: (typeof mapSrcList)[0] }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateCurrentMap', { ...data, gameId });
  },
);

/** 更新事件地圖 */
export const socketGameUpdateEventMapAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateEventMap}`,
  async (data: { eventMap: number[][] }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateEventMap', { ...data, gameId });
  },
);

/** 更新部分事件地圖 */
export const socketGamePartialUpdateEventMapAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updatePartialEventMap}`,
  async (data: { x: number; y: number; stateNumber: number }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updatePartialEventMap', { ...data, gameId });
  },
);

/** 更新主要任務 */
export const socketGameUpdateMainMissionAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateMainMission}`,
  async (data: { mainMission: (typeof mainMissions)[0] }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateMainMission', { ...data, gameId });
  },
);

/** 更新核心列表 */
export const socketGameUpdateCoreListAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateCoreList}`,
  async (data: { core: number }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateCoreList', { ...data, gameId });
  },
);

/** 更新核心紀錄 */
export const socketGameUpdateCoreLogAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateCoreLog}`,
  async (
    data: { core: EventItem; position: number[]; playerOrder: number },
    { getState },
  ) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateCoreLog', {
      core: { ...data, timestamp: new Date() },
      gameId,
    });
  },
);

/** 移除核心紀錄 */
export const socketGameRemoveCoreLogAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.removeCoreLog}`,
  async (data: { core: EventItem }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('removeCoreLog', { ...data, gameId });
  },
);

/** 更新全部角色資訊 */
export const socketGameUpdatePlayersAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updatePlayers}`,
  async (data: { players: DetectiveGameParamsPlayer[] }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('updatePlayers', { ...data, gameId });
  },
);

/** 更新個別角色資訊 */
export const socketGameUpdateOnePlayerAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.updateOnePlayer}`,
  async (
    data: {
      index: number;
      player: DetectiveGameParamsPlayer;
      isUpdateSkill?: boolean;
      checkRaceQuiz?: boolean;
      side?: 'left' | 'right';
      players?: DetectiveGameParamsPlayer[];
    },
    { getState },
  ) => {
    const gameId = getStateGameId(getState);
    socket.emit('updateOnePlayer', { ...data, gameId });
  },
);

/** 停止敵對移動 */
export const socketGameStopOtherTeamAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.stopOtherTeam}`,
  async (data: { seconds: number }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('stopOtherTeam', { ...data, gameId });
  },
);

/** 同步 Payload */
export const socketGameSyncPayloadAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.syncPayload}`,
  async (data: { payload: any }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('syncPayload', { ...data, gameId });
  },
);

/** 加時間 */
export const socketGameAddTimeAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.addTime}`,
  async (data: { seconds: number }, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('addTime', { ...data, gameId });
  },
);

/** 同步時間 */
export const socketGameGetTimeAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.getTime}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('getTime', { gameId });
  },
);

/** 檢查核心遺失 */
export const socketGameCheckLostCoresAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.checkLostCores}`,
  async (_, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('checkLostCores', { gameId });
  },
);

/** 遊戲結束 */
export const socketGameEndGameAsync = createAsyncThunk(
  `${ReducerName.SOCKET_GAME}/${SocketGameAction.endGame}`,
  async (data: { winnerSide?: 'left' | 'right' } | undefined, { getState }) => {
    const gameId = getStateGameId(getState);
    socket.emit('endGame', { ...data, gameId });
  },
);
