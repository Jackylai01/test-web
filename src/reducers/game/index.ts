import { EventItem } from '@enums/event-item';
import { MonsterType } from '@enums/monster-type';
import { ReducerName } from '@enums/reducer-name';
import { BehaviorPattern } from '@helpers/game';
import { GameMode } from '@models/entities/game/detective-game';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameModalType {
  主要任務 = '主要任務',
  遊戲說明 = '遊戲說明',
  操作說明 = '操作說明',
  怪物說明 = '怪物說明',
  怪物問題 = '怪物問題',
  攻擊特效 = '攻擊特效',
  答題結果 = '答題結果',
  死亡說明 = '死亡說明',
  遊戲結果 = '遊戲結果',
  答題回顧 = '答題回顧',
}

export enum AnswerResultType {
  發動攻擊 = '發動攻擊',
  遭受攻擊 = '遭受攻擊',
  通過陷阱 = '通過陷阱',
  陷入陷阱 = '陷入陷阱',
  取得核心 = '取得核心',
  核心消失 = '核心消失',
  搶答成功 = '搶答成功',
  搶答失敗 = '搶答失敗',
  搶答答錯 = '搶答答錯',
}

type GameSetting = {
  mode: GameMode | null;
  modalType: GameModalType | null;
  monsterType: MonsterType | null;
  wandererOrder: number | null;
  coreType: EventItem | null;
  isGameStart: boolean;
  isAnswering: boolean;
  isAnswerTimeout: boolean;
  answerCorrectCounter: number;
  answerResultType: AnswerResultType | null;
  monstersPosition: BehaviorPattern[] | null;
};

const initialState: GameSetting = {
  mode: null,
  modalType: GameModalType.主要任務,
  monsterType: null,
  wandererOrder: null,
  coreType: null,
  isGameStart: false,
  isAnswering: false,
  isAnswerTimeout: false,
  answerCorrectCounter: 0,
  answerResultType: null,
  monstersPosition: null,
};

const gameSlice = createSlice({
  name: ReducerName.GAME,
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<GameSetting['mode']>) => {
      state.mode = action.payload;
    },
    setGameModalType: (state, action: PayloadAction<GameModalType | null>) => {
      state.modalType = action.payload;
    },
    setMonsterType: (state, action: PayloadAction<MonsterType | null>) => {
      state.monsterType = action.payload;
    },
    setMonstersPosition: (
      state,
      action: PayloadAction<BehaviorPattern[] | null>,
    ) => {
      state.monstersPosition = action.payload;
    },
    setWandererOrder: (state, action: PayloadAction<number>) => {
      state.wandererOrder = action.payload;
    },
    setCoreType: (state, action: PayloadAction<EventItem | null>) => {
      state.coreType = action.payload;
    },
    setIsGameStart: (state, action: PayloadAction<boolean>) => {
      state.isGameStart = action.payload;
    },
    setIsAnswering: (state, action: PayloadAction<boolean>) => {
      state.isAnswering = action.payload;
    },
    setIsAnswerTimeout: (state, action: PayloadAction<boolean>) => {
      state.isAnswerTimeout = action.payload;
    },
    setAnswerCorrectCounter: (state, action: PayloadAction<number>) => {
      state.answerCorrectCounter = action.payload;
    },
    setAnswerResultType: (
      state,
      action: PayloadAction<AnswerResultType | null>,
    ) => {
      state.answerResultType = action.payload;
    },
    resetGameSetting: () => initialState,
  },
});

export const {
  setMode,
  setGameModalType,
  setMonsterType,
  setMonstersPosition,
  setWandererOrder,
  setCoreType,
  setIsGameStart,
  setIsAnswering,
  setIsAnswerTimeout,
  setAnswerCorrectCounter,
  setAnswerResultType,
  resetGameSetting,
} = gameSlice.actions;
export default gameSlice.reducer;
