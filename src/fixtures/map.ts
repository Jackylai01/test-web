import futureBoard from '@public/game-source/game-map/future-board.svg';
import futureCoreBg from '@public/game-source/game-map/future-core-bg.png';
import futureEmpty from '@public/game-source/game-map/future-empty.png';
import futureHeader from '@public/game-source/game-map/future-header.png';
import futureMap_01 from '@public/game-source/game-map/future-map_01.jpg';
import futureMap_02 from '@public/game-source/game-map/future-map_02.jpg';
import futureMap_03 from '@public/game-source/game-map/future-map_03.jpg';
import futureMap_04 from '@public/game-source/game-map/future-map_04.jpg';
import futureMap_05 from '@public/game-source/game-map/future-map_05.jpg';
import futureMap_06 from '@public/game-source/game-map/future-map_06.jpg';
import futureMap_07 from '@public/game-source/game-map/future-map_07.jpg';
import futureMap_08 from '@public/game-source/game-map/future-map_08.jpg';
import futureObstacle from '@public/game-source/game-map/future-obstacle.jpg';
import mainBillboardGreen from '@public/game-source/mission-billboard/main-billboard-green.png';

import glacialBoard from '@public/game-source/game-map/glacial-board.png';
import glacialCoreBg from '@public/game-source/game-map/glacial-core-bg.png';
import glacialEmpty from '@public/game-source/game-map/glacial-empty.png';
import glacialHeader from '@public/game-source/game-map/glacial-header.png';
import glacialMap_01 from '@public/game-source/game-map/glacial-map_01.jpg';
import glacialMap_02 from '@public/game-source/game-map/glacial-map_02.jpg';
import glacialMap_03 from '@public/game-source/game-map/glacial-map_03.jpg';
import glacialMap_04 from '@public/game-source/game-map/glacial-map_04.jpg';
import glacialMap_05 from '@public/game-source/game-map/glacial-map_05.jpg';
import glacialMap_06 from '@public/game-source/game-map/glacial-map_06.jpg';
import glacialMap_07 from '@public/game-source/game-map/glacial-map_07.jpg';
import glacialMap_08 from '@public/game-source/game-map/glacial-map_08.jpg';
import glacialObstacle from '@public/game-source/game-map/glacial-obstacle.jpg';
import mainBillboardBlue from '@public/game-source/mission-billboard/main-billboard-blue.png';

import industryBoard from '@public/game-source/game-map/industry-board.png';
import industryCoreBg from '@public/game-source/game-map/industry-core-bg.png';
import industryEmpty from '@public/game-source/game-map/industry-empty.png';
import industryHeader from '@public/game-source/game-map/industry-header.png';
import industryMap_01 from '@public/game-source/game-map/industry-map_01.jpg';
import industryMap_02 from '@public/game-source/game-map/industry-map_02.jpg';
import industryMap_03 from '@public/game-source/game-map/industry-map_03.jpg';
import industryMap_04 from '@public/game-source/game-map/industry-map_04.jpg';
import industryMap_05 from '@public/game-source/game-map/industry-map_05.jpg';
import industryMap_06 from '@public/game-source/game-map/industry-map_06.jpg';
import industryMap_07 from '@public/game-source/game-map/industry-map_07.jpg';
import industryMap_08 from '@public/game-source/game-map/industry-map_08.jpg';
import industryObstacle from '@public/game-source/game-map/industry-obstacle.jpg';
import mainBillboardRed from '@public/game-source/mission-billboard/main-billboard-red.png';

export const mapSrcList = [
  {
    type: 'future',
    mapSrc: [
      futureMap_01,
      futureMap_02,
      futureMap_03,
      futureMap_04,
      futureMap_05,
      futureMap_06,
      futureMap_07,
      futureMap_08,
    ],
    initialSeat: [[8, 8]],
    borderSrc: futureBoard,
    headerSrc: futureHeader,
    coreBgSrc: futureCoreBg,
    billboardSrc: mainBillboardGreen,
    emptySrc: futureEmpty,
    obstacleSrc: futureObstacle,
  },
  {
    type: 'glacial',
    mapSrc: [
      glacialMap_01,
      glacialMap_02,
      glacialMap_03,
      glacialMap_04,
      glacialMap_05,
      glacialMap_06,
      glacialMap_07,
      glacialMap_08,
    ],
    initialSeat: [[8, 8]],
    borderSrc: glacialBoard,
    headerSrc: glacialHeader,
    coreBgSrc: glacialCoreBg,
    billboardSrc: mainBillboardBlue,
    emptySrc: glacialEmpty,
    obstacleSrc: glacialObstacle,
  },
  {
    type: 'industry',
    mapSrc: [
      industryMap_01,
      industryMap_02,
      industryMap_03,
      industryMap_04,
      industryMap_05,
      industryMap_06,
      industryMap_07,
      industryMap_08,
    ],
    initialSeat: [[8, 8]],
    borderSrc: industryBoard,
    headerSrc: industryHeader,
    coreBgSrc: industryCoreBg,
    billboardSrc: mainBillboardRed,
    emptySrc: industryEmpty,
    obstacleSrc: industryObstacle,
  },
];
