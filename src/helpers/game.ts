import { EventItem } from '@enums/event-item';
import {
  DetectiveGame,
  GameMode,
} from '../models/entities/game/detective-game';
import { findRandomEmptyPosition } from './gameMap';
import { isNullOrEmpty, isNullOrUndefined } from './utils';

export function checkLeftSide(game: DetectiveGame, userId: any) {
  let isLeftSide = true;
  if (isNullOrEmpty(userId)) {
    return isLeftSide;
  }
  const _userId = `${userId}`;
  isLeftSide = game.leftSideUsers?.some((x) => x._id === _userId) === true;
  return isLeftSide;
}

export function checkIsPlaying(
  isLeftSide: boolean,
  game: DetectiveGame,
  userId: any,
) {
  if (game.mode === GameMode.個人賽) {
    return true;
  }
  const sideUser = isLeftSide
    ? game.leftSideUsers?.find((x) => x.selected)
    : game.rightSideUsers?.find((x) => x.selected);
  const isPlaying = sideUser?._id === userId;
  return isPlaying;
}

export function checkIsPlayer(game: DetectiveGame, userId: any) {
  const player = getPlayer(game, userId);
  const isPlayer = !isNullOrUndefined(player);
  return isPlayer;
}

export function getPlayer(game: DetectiveGame, userId: any) {
  if (game.mode === GameMode.個人賽) {
    return null;
  }
  const isLeftSide = checkLeftSide(game, userId);
  const player = isLeftSide
    ? game.leftSideUsers?.find((x) => x._id === userId)
    : game.rightSideUsers?.find((x) => x._id === userId);
  return player;
}

export type BehaviorPattern = { x: number; y: number; direction: string };

const isWall = (currentMap: number[][], x: number, y: number) =>
  currentMap[x][y] === EventItem.WALL;

export const getBehaviorPattern = (
  position: number[],
  eventMap: number[][],
): BehaviorPattern[] => {
  const behaviorPattern: BehaviorPattern[] = [
    { x: position[0], y: position[1], direction: 'bottom' },
  ];
  let currentPosition = position;

  while (behaviorPattern.length < 620) {
    var randomInt = Math.ceil(Math.random() * 4);
    const [x, y] = currentPosition;

    switch (randomInt) {
      case 1:
        // top
        if (x - 1 < 0) break;
        if (!isWall(eventMap, x - 1, y)) {
          behaviorPattern.push({
            x: x - 1,
            y: y,
            direction: 'bottom',
          });
          currentPosition = [x - 1, y];
        }
        break;
      case 2:
        // bottom
        if (x + 1 > 14) break;
        if (!isWall(eventMap, x + 1, y)) {
          behaviorPattern.push({
            x: x + 1,
            y: y,
            direction: 'top',
          });
          currentPosition = [x + 1, y];
        }

        break;
      case 3:
        // left
        if (y - 1 < 0) break;
        if (!isWall(eventMap, x, y - 1)) {
          behaviorPattern.push({
            x: x,
            y: y - 1,
            direction: 'left',
          });
          currentPosition = [x, y - 1];
        }
        break;
      case 4:
        // right
        if (y + 1 > 14) break;
        if (!isWall(eventMap, x, y + 1)) {
          behaviorPattern.push({
            x: x,
            y: y + 1,
            direction: 'right',
          });
          currentPosition = [x, y + 1];
        }
        break;

      default:
        break;
    }
  }

  return behaviorPattern;
};

export type Monster = {
  hp: number;
  position: number[];
  behaviorPattern: BehaviorPattern[];
  stopPosition?: BehaviorPattern;
};

export const getMonstersStatus = (
  monstersNumber: number,
  eventMap: number[][],
) => {
  const monsters: Monster[] = [];
  let hp = 3;

  while (monsters.length < monstersNumber) {
    let position = findRandomEmptyPosition(eventMap);
    const behaviorPattern: BehaviorPattern[] = getBehaviorPattern(
      position,
      eventMap,
    );
    monsters.find((item) => item.position.toString() === position.toString())
      ? null
      : monsters.push({ hp, position, behaviorPattern });
  }

  return monsters;
};

export const sideUpperCase = (side: 'left' | 'right') =>
  side.toUpperCase() as 'LEFT' | 'RIGHT';
