import { formatQueryString } from '@helpers/query';
import { GameInfo } from '@models/entities/game/game-info';
import {
  ApiListResult,
  ApiResult,
  getRequest,
  postRequest,
} from '@services/shared/api';
import {
  DetectiveGame,
  DetectiveGameRanking,
} from '../../../models/entities/game/detective-game';
import { Team } from '../../../models/entities/school/team';

export const apiGameDetailGameInfo = () =>
  getRequest<ApiResult<GameInfo>>(formatQueryString('/detective-game/info'));

export const apiGameFinishAllStages = () =>
  postRequest<ApiResult<{ isValid: boolean; message: string }>>(
    '/detective-game/finish-all-stages',
  );

export const apiGameGetRanking = () =>
  getRequest<ApiResult<DetectiveGameRanking>>(
    formatQueryString('/detective-game/ranking'),
  );

export const apiPreliminaryRecords = () =>
  getRequest<ApiResult<any>>(
    formatQueryString('/detective-game/preliminary-records'),
  );

export const apiInitFinalGame = (body: {
  leftTeamId: string;
  rightTeamId: string;
}) =>
  postRequest<ApiResult<DetectiveGame>>(
    '/detective-game/init-final-game',
    body,
  );

export const apiListTeams = (schoolCode: string | null) =>
  getRequest<ApiListResult<Team>>(
    `/detective-game/teams?schoolCode=${schoolCode ?? ''}`,
  );
