import { EventItem } from '@enums/event-item';
import { LocalStorageKey } from '@enums/local-storage-key';
import { ReducerName } from '@enums/reducer-name';
import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';
import { asyncMatcher } from '@helpers/extra-reducers';
import { Monster } from '@helpers/game';
import { newApiState } from '@helpers/initial-state';
import { removeJson } from '@helpers/local-storage';
import { jwtDecode, loadToken } from '@helpers/token';
import { ApiState } from '@models/api/api-state';
import {
  DetectiveGame,
  DetectiveGameParamsPlayer,
  remainingSeconds,
} from '@models/entities/game/detective-game';
import { Quiz } from '@models/entities/record/record';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SocketGameAction } from './actions';

type SocketGameState = ApiState<SocketGameAction> & {
  isConnecting: boolean;
  isConnected: boolean;
  socketId: string | null;
  errorMessage: string | null;
  game: DetectiveGame | null;
  syncData: any;
  side: 'left' | 'right';
  teamOrder: number;
  playerOrder: number;
  isViewer: boolean;
  coreCheckCount: number;
};

const initialState: SocketGameState = {
  isConnecting: false,
  isConnected: false,
  socketId: null,
  errorMessage: null,
  game: null,
  syncData: null,
  side: 'left',
  teamOrder: 0,
  playerOrder: 0,
  isViewer: false,
  coreCheckCount: 0,
  ...newApiState<SocketGameState>(SocketGameAction),
};

const socketGameSlice = createSlice({
  name: ReducerName.SOCKET_GAME,
  initialState,
  reducers: {
    socketGameConnect: (state) => {
      state.isConnecting = true;
    },
    socketGameConnected: (state, action: PayloadAction<string>) => {
      state.isConnecting = false;
      state.isConnected = true;
      state.socketId = action.payload;
    },
    socketGameDisconnect: (state) => {
      state.isConnecting = false;
      state.isConnected = false;
      state.socketId = null;
    },
    socketGameSetData: (state, action: PayloadAction<DetectiveGame>) => {
      if (state.game) {
        const { params, ...rest } = action.payload;
        state.game = { ...rest, params: state.game.params };
      } else {
        state.game = action.payload;
      }

      const token = loadToken();
      if (!token) return;
      const userId = jwtDecode(token.accessToken)._id;
      const leftSideOrder = action.payload.leftSideUsers?.findIndex(
        (user) => user._id === userId,
      );
      const rightSideOrder = action.payload.rightSideUsers?.findIndex(
        (user) => user._id === userId,
      );
      if (leftSideOrder !== undefined && leftSideOrder !== -1) {
        state.side = 'left';
        state.teamOrder = leftSideOrder;
        state.playerOrder = leftSideOrder;
      } else if (rightSideOrder !== undefined && rightSideOrder !== -1) {
        state.side = 'right';
        state.teamOrder = rightSideOrder;
        state.playerOrder =
          (action.payload.leftSideUsers?.length ?? 0) + rightSideOrder;
      }
    },
    socketGameSetAllData: (state, action: PayloadAction<DetectiveGame>) => {
      state.game = action.payload;
    },
    socketGameSetCurrentMap: (
      state,
      action: PayloadAction<typeof mapSrcList[0]>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.currentMap = action.payload;
    },
    socketGameSetQuizList: (state, action: PayloadAction<Quiz[]>) => {
      if (!state.game) return;
      state.game.quizList = action.payload;
    },
    socketGameUpdateQuiz: (state, action: PayloadAction<Quiz>) => {
      if (!state.game) return;
      const index = state.game.quizList.findIndex(
        (quiz) => quiz._id === action.payload._id,
      );
      state.game.quizList[index] = action.payload;
    },
    socketGameSetEventMap: (state, action: PayloadAction<number[][]>) => {
      if (!state.game?.params) return;
      state.game.params.eventMap = action.payload;
    },
    socketGameSetPartialEventMap: (state, action: PayloadAction<any>) => {
      if (!state.game?.params?.eventMap) return;
      state.game.params.eventMap[action.payload.x][action.payload.y] =
        action.payload.stateNumber;
    },
    socketGameSetMultiPartialEventMap: (state, action: PayloadAction<any>) => {
      if (!state.game?.params?.eventMap) return;
      action.payload.forEach((item: any) => {
        state.game!.params!.eventMap[item.y][item.x] = item.stateNumber;
      });
    },
    socketGameSetMonstersStatus: (state, action: PayloadAction<Monster[]>) => {
      if (!state.game?.params) return;
      state.game.params.monsters = action.payload;
    },
    socketGameSetMainMission: (
      state,
      action: PayloadAction<typeof mainMissions[0]>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.mainMission = action.payload;
    },
    socketGameUpdateCoreList: (
      state,
      action: PayloadAction<{ core: EventItem }>,
    ) => {
      if (!state.game?.params) return;
      if (
        action.payload.core >= EventItem.CORE_1_LEFT &&
        action.payload.core <= EventItem.CORE_5_LEFT
      ) {
        state.game.params.leftCoreList = [
          ...state.game.params.leftCoreList,
          action.payload.core,
        ];
      } else if (
        action.payload.core >= EventItem.CORE_1_RIGHT &&
        action.payload.core <= EventItem.CORE_5_RIGHT
      ) {
        state.game.params.rightCoreList = [
          ...state.game.params.rightCoreList,
          action.payload.core,
        ];
      }
    },
    socketGameSetCoreLogs: (state, action: PayloadAction<any>) => {
      if (!state.game?.params) return;
      state.game.params.coreLogs = action.payload.coreLogs;
    },
    socketGameSetPlayers: (
      state,
      action: PayloadAction<DetectiveGameParamsPlayer[]>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.players = action.payload;
    },
    socketGameSetRemainingSeconds: (
      state,
      action: PayloadAction<remainingSeconds>,
    ) => {
      if (!state.game?.params) return;
      state.game.leftRemainingSeconds = action.payload.leftRemainingSeconds;
      state.game.rightRemainingSeconds = action.payload.rightRemainingSeconds;
    },
    socketGameSetMultiPlayers: (
      state,
      action: PayloadAction<
        {
          index: number;
          player: DetectiveGameParamsPlayer;
        }[]
      >,
    ) => {
      if (!state.game?.params) return;
      for (const { index, player } of action.payload) {
        state.game.params.players[index] = player;
      }
    },
    socketGameSetOnePlayer: (
      state,
      action: PayloadAction<{
        index: number;
        player: DetectiveGameParamsPlayer;
      }>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.players[action.payload.index] = action.payload.player;
    },
    socketGameSetPlayerPositionAndSkill: (
      state,
      action: PayloadAction<{
        index: number;
        player: DetectiveGameParamsPlayer;
      }>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.players[action.payload.index].currentDirection =
        action.payload.player.currentDirection;
      state.game.params.players[action.payload.index].currentPosition =
        action.payload.player.currentPosition;
      state.game.params.players[action.payload.index].skillCount =
        action.payload.player.skillCount;
    },
    socketGameSetStopEndTime: (
      state,
      action: PayloadAction<{
        leftStopEndTime?: Date;
        rightStopEndTime?: Date;
      }>,
    ) => {
      if (!state.game?.params) return;
      state.game.params.leftStopEndTime = action.payload.leftStopEndTime;
      state.game.params.rightStopEndTime = action.payload.rightStopEndTime;
    },
    socketGameSetSyncData: (state, action: PayloadAction<any>) => {
      state.syncData = action.payload;
    },
    socketGameUpdateIsViewer: (state) => {
      const users = (state.game?.leftSideUsers ?? []).concat(
        state.game?.rightSideUsers ?? [],
      );
      const token = loadToken();
      let userId = '';
      if (token) {
        userId = jwtDecode(token.accessToken)._id;
      }
      state.isViewer = !users.some((user) => user._id === userId);
    },
    socketGameIncreaseCoreCheckCount: (state) => {
      state.coreCheckCount += 1;
    },
    socketGameSetError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      removeJson(LocalStorageKey.GAME);
      removeJson(LocalStorageKey.ROOM_ID);
    },
    resetSocketGameGame: (state) => {
      state.game = initialState.game;
    },
    resetSocketGame: () => initialState,
  },
  extraReducers: (builder) => {
    asyncMatcher(builder, ReducerName.SOCKET_GAME);
  },
});

export const {
  socketGameConnect,
  socketGameConnected,
  socketGameDisconnect,
  socketGameSetData,
  socketGameSetAllData,
  socketGameSetCurrentMap,
  socketGameSetEventMap,
  socketGameSetPartialEventMap,
  socketGameSetMultiPartialEventMap,
  socketGameSetQuizList,
  socketGameUpdateQuiz,
  socketGameSetMonstersStatus,
  socketGameSetMainMission,
  socketGameUpdateCoreList,
  socketGameSetCoreLogs,
  socketGameSetPlayers,
  socketGameSetMultiPlayers,
  socketGameSetOnePlayer,
  socketGameSetPlayerPositionAndSkill,
  socketGameSetRemainingSeconds,
  socketGameSetSyncData,
  socketGameSetStopEndTime,
  socketGameUpdateIsViewer,
  socketGameIncreaseCoreCheckCount,
  socketGameSetError,
  resetSocketGameGame,
  resetSocketGame,
} = socketGameSlice.actions;
export default socketGameSlice.reducer;
