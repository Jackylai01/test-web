import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import {
  DetectiveGame,
  DetectiveGameRanking,
} from '@models/entities/game/detective-game';
import { GameInfo } from '@models/entities/game/game-info';
import { Team } from '@models/entities/school/team';
import { createSlice } from '@reduxjs/toolkit';
import {
  ClientGameAsyncAction,
  clientGamTeamListAsync,
  clientGameFinishAllStagesAsync,
  clientGameGameInfoAsync,
  clientGameGameRankingAsync,
  clientGameInitFinalGameAsync,
} from './actions';

type AuthState = ApiState<ClientGameAsyncAction> & {
  gameInfo: GameInfo | null;
  gameRanking: DetectiveGameRanking | null;
  finishAllStageResult: { isValid: boolean; message: string } | null;
  teamList: Team[] | null;
  finalGame: DetectiveGame | null;
};

const initialState: AuthState = {
  gameInfo: null,
  gameRanking: null,
  finishAllStageResult: null,
  teamList: null,
  finalGame: null,
  ...newApiState<AuthState>(ClientGameAsyncAction),
};

const clientGameSlice = createSlice({
  name: ReducerName.CLIENT_GAME,
  initialState,
  reducers: {
    resetClientGameStatus: (state) => {
      state.status = initialState.status;
    },
    resetClientGameFinalGame: (state) => {
      state.finalGame = initialState.finalGame;
    },
    resetClientGame: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(clientGameGameInfoAsync.fulfilled, (state, action) => {
      state.gameInfo = action.payload;
    });
    builder.addCase(clientGameGameRankingAsync.fulfilled, (state, action) => {
      state.gameRanking = action.payload;
    });
    builder.addCase(
      clientGameFinishAllStagesAsync.fulfilled,
      (state, action) => {
        state.finishAllStageResult = action.payload;
      },
    );
    builder.addCase(clientGamTeamListAsync.fulfilled, (state, action) => {
      state.teamList = action.payload;
    });
    builder.addCase(clientGameInitFinalGameAsync.fulfilled, (state, action) => {
      state.finalGame = action.payload;
    });
    asyncMatcher(builder, ReducerName.CLIENT_GAME);
  },
});

export const {
  resetClientGameStatus,
  resetClientGameFinalGame,
  resetClientGame,
} = clientGameSlice.actions;
export default clientGameSlice.reducer;
