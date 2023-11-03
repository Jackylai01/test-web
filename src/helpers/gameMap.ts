import { EventItem } from '@enums/event-item';
import { Corner } from '@models/entities/game/detective-game';
import { randomItem, randomNumber } from './random';

export const getSpaceAddress = (sourceMap: number[][]) => {
  const emptySpace: number[][] = [];

  sourceMap.map((row, rowIndex) =>
    row.map(
      (col, colIndex) => col === 0 && emptySpace.push([rowIndex, colIndex]),
    ),
  );

  return emptySpace;
};

export const setMapTargetSpaceState = (
  currentMapData: number[][],
  x: number,
  y: number,
  stateNumber: EventItem,
) => {
  const newMap: number[][] = JSON.parse(JSON.stringify(currentMapData));
  newMap[x][y] = stateNumber;
  return [...newMap];
};

export const findRandomEmptyPosition = (
  currentMapData: number[][],
): number[] => {
  let newPosition = randomNumber(2, 15);
  let positionState = 10;

  while (positionState !== 0) {
    newPosition = randomNumber(2, 15);
    positionState = currentMapData[newPosition[0] - 1][newPosition[1] - 1];
  }

  return [newPosition[0] - 1, newPosition[1] - 1];
};

export const findSpecifiedState = (eventMap: number[][]) => {
  let x: number = 0;
  let y: number = 0;
  eventMap.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (col > 19 && 26 > col) {
        x = rowIndex;
        y = colIndex;
      }
    }),
  );

  return [x, y];
};

export const checkOrderState = (eventMap: number[][], state: number) => {
  let isOrder: boolean = false;
  eventMap.forEach((row) =>
    row.forEach((col) => {
      if (col === state) {
        isOrder = true;
      }
    }),
  );

  return isOrder;
};

export const getInitialEventMap = (
  currentMapData: number[][],
  currentPosition: number[],
  coresCount: number,
  monsterCount: number,
) => {
  const initialMap = JSON.parse(JSON.stringify(currentMapData));
  initialMap[currentPosition[0]][currentPosition[1]] = 100;
  let trapCount = 20 - coresCount - monsterCount;

  let spaceAddress = getSpaceAddress(initialMap);
  let randomTraps = randomNumber(coresCount, spaceAddress.length);

  randomTraps.map(
    (item, index) =>
      (initialMap[spaceAddress[item - 1][0]][spaceAddress[item - 1][1]] =
        20 + index),
  );

  spaceAddress = getSpaceAddress(initialMap);
  randomTraps = randomNumber(trapCount, spaceAddress.length);

  randomTraps.map(
    (item) =>
      (initialMap[spaceAddress[item - 1][0]][spaceAddress[item - 1][1]] = 30),
  );

  return initialMap;
};

export function getSubMap(
  currentMap: number[][],
  startY: number,
  startX: number,
  width: number,
  height: number,
) {
  return currentMap
    .slice(startY, startY + height)
    .map((row) => row.slice(startX, startX + width));
}

export function randomSpace(currentMap: number[][], corner: Corner) {
  let [startY, startX] = [0, 0];
  switch (corner) {
    case Corner.TopLeft:
      [startY, startX] = [0, 0];
      break;
    case Corner.TopRight:
      [startY, startX] = [0, 12];
      break;
    case Corner.BottomLeft:
      [startY, startX] = [12, 0];
      break;
    case Corner.BottomRight:
      [startY, startX] = [12, 12];
      break;
  }

  const subMap = getSubMap(currentMap, startY, startX, 3, 3);
  const emptySpaces = getSpaceAddress(subMap);
  const [randomY, randomX] = randomItem(emptySpaces);

  // reverse for player position
  return [startX + randomX, startY + randomY];
}
