import { LocalStorageKey } from '@enums/local-storage-key';
import { ReducerName } from '@enums/reducer-name';
import { SOCKET_URL, isDebug } from '@fixtures/constants';
import { saveJson } from '@helpers/local-storage';
import { loadToken } from '@helpers/token';
import { isBrowser } from '@helpers/utils';
import { DetectiveGame } from '@models/entities/game/detective-game';
import { Quiz } from '@models/entities/record/record';
import {
  socketGameConnect,
  socketGameConnected,
  socketGameDisconnect,
  socketGameSetAllData,
  socketGameSetCoreLogs,
  socketGameSetCurrentMap,
  socketGameSetData,
  socketGameSetError,
  socketGameSetEventMap,
  socketGameSetMainMission,
  socketGameSetMonstersStatus,
  socketGameSetMultiPartialEventMap,
  socketGameSetMultiPlayers,
  socketGameSetOnePlayer,
  socketGameSetPartialEventMap,
  socketGameSetPlayerPositionAndSkill,
  socketGameSetPlayers,
  socketGameSetRemainingSeconds,
  socketGameSetStopEndTime,
  socketGameSetSyncData,
  socketGameUpdateCoreList,
  socketGameUpdateIsViewer,
  socketGameUpdateQuiz,
} from '@reducers/socket-game';
import { Middleware } from 'redux';
import { Socket, io } from 'socket.io-client';

export let socket: Socket;

const getIP = () => {
  if (!isBrowser()) return '';

  const ip = localStorage.getItem('ip');
  return `${ip}`;
};

const socketGameMiddleware: Middleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (!action.type.startsWith(ReducerName.SOCKET_GAME)) return next(action);

    if (socketGameConnect.match(action)) {
      const token = loadToken();
      // if (!token) return;
      socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: token
          ? { token: token.accessToken, ip: getIP() }
          : { ip: getIP() },
        autoConnect: true,
        upgrade: false,
      });

      socket.on('connect', () => {
        isDebug && console.log('connect', socket.id);
        socket.connected && dispatch(socketGameConnected(socket.id));
      });

      socket.on('disconnect', () => {
        isDebug && console.log('disconnect', socket.id);
        dispatch(socketGameDisconnect());
      });

      socket.on(
        'actionUpdated',
        (payload: {
          action: string;
          message: string;
          game?: DetectiveGame;
          currentMap?: any;
          eventMap?: any;
          mainMission?: any;
          leftCoreList?: any;
          rightCoreList?: any;
          coreLogs?: any;
          newCorePositions?: any;
          monsters?: any;
          players?: any;
          index?: number;
          player?: any;
          body?: any;
          quiz?: Quiz;
          leftStopEndTime?: Date;
          rightStopEndTime?: Date;
        }) => {
          isDebug && console.log('actionUpdated', payload.action, payload);

          if (
            payload.action === 'error' &&
            payload.message !== 'game not found'
          ) {
            if (payload.message === 'team not found') {
              dispatch(socketGameSetError('沒有報名團體戰'));
            } else if (payload.message === 'player not found') {
              dispatch(socketGameSetError('沒有參加這場遊戲'));
            } else {
              dispatch(socketGameSetError(payload.message));
            }
            return;
          }

          switch (payload.action) {
            case 'selectCharacterDone':
              payload.game && dispatch(socketGameSetAllData(payload.game));
              break;
            case 'raceQuiz':
              payload.players &&
                dispatch(socketGameSetMultiPlayers(payload.players));
              payload.quiz && dispatch(socketGameUpdateQuiz(payload.quiz));
              break;
            case 'answerQuiz':
              payload.quiz && dispatch(socketGameUpdateQuiz(payload.quiz));
              payload.newCorePositions &&
                dispatch(
                  socketGameSetMultiPartialEventMap(payload.newCorePositions),
                );
              break;
            case 'updateCurrentMap':
              payload.currentMap &&
                dispatch(socketGameSetCurrentMap(payload.currentMap));
              break;
            case 'updateEventMap':
              payload.eventMap &&
                dispatch(socketGameSetEventMap(payload.eventMap));
              break;
            case 'updatePartialEventMap':
              payload.body &&
                dispatch(socketGameSetPartialEventMap(payload.body));
              break;
            case 'updateMultiPartialEventMap':
              payload.newCorePositions &&
                dispatch(
                  socketGameSetMultiPartialEventMap(payload.newCorePositions),
                );
              break;
            case 'updateMonsters':
              payload.monsters &&
                dispatch(socketGameSetMonstersStatus(payload.monsters));
              break;
            case 'updateMainMission':
              payload.mainMission &&
                dispatch(socketGameSetMainMission(payload.mainMission));
              break;
            case 'updateCoreList':
              payload.body && dispatch(socketGameUpdateCoreList(payload.body));
              break;
            case 'updateCoreLog':
            case 'removeCoreLog':
              payload.body && dispatch(socketGameSetCoreLogs(payload.body));
              break;
            case 'getTime':
              payload.game?.leftRemainingSeconds &&
                payload.game.rightRemainingSeconds &&
                dispatch(
                  socketGameSetRemainingSeconds({
                    leftRemainingSeconds: payload.game?.leftRemainingSeconds,
                    rightRemainingSeconds: payload.game.rightRemainingSeconds,
                  }),
                );
              break;
            case 'updatePlayers':
              payload.players &&
                dispatch(socketGameSetPlayers(payload.players));
              break;
            case 'updateOnePlayer':
              payload.index !== undefined &&
                payload.player &&
                dispatch(
                  socketGameSetOnePlayer({
                    index: payload.index,
                    player: payload.player,
                  }),
                );
              break;
            case 'updatePlayerPositionAndSkill':
              payload.index !== undefined &&
                payload.player &&
                dispatch(
                  socketGameSetPlayerPositionAndSkill({
                    index: payload.index,
                    player: payload.player,
                  }),
                );
              break;
            case 'stopOtherTeam':
              (payload.leftStopEndTime || payload.rightStopEndTime) &&
                dispatch(
                  socketGameSetStopEndTime({
                    leftStopEndTime: payload.leftStopEndTime,
                    rightStopEndTime: payload.rightStopEndTime,
                  }),
                );
              break;
            default:
              if (!payload.game) return;

              if (
                payload.action === 'getIndividualGame' ||
                payload.action === 'getPreliminaryGame' ||
                payload.action === 'getFinalGame'
              ) {
                saveJson<DetectiveGame>(LocalStorageKey.GAME, payload.game);
              }

              if (payload.action === 'getFinalGamePublic') {
                dispatch(socketGameUpdateIsViewer());
              }

              dispatch(socketGameSetData(payload.game));
          }
        },
      );

      socket.on(
        'payloadUpdated',
        (payload: { action: string; payload: any }) => {
          isDebug &&
            console.log('payloadUpdated', payload.action, payload.payload);

          dispatch(socketGameSetSyncData(payload.payload));
        },
      );
    }

    if (socketGameDisconnect.match(action)) {
      if (!socket) return;
      socket.off('connect');
      socket.off('disconnect');
      socket.off('actionUpdated');
      socket.off('payloadUpdated');
    }

    next(action);
  };
};

export default socketGameMiddleware;
