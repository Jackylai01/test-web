import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';

import { DetectiveGame, GameMode } from '@models/entities/game/detective-game';
import Image from 'next/image';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  currentMap: (typeof mapSrcList)[0];
  mainMission: (typeof mainMissions)[0];
  side?: 'left' | 'right';
};

const CoresBar = ({ currentMap, mainMission, side }: Props) => {
  const { game, side: gameSide } = useAppSelector((state) => state.socketGame);
  const { category, params } = game as DetectiveGame;
  const coreSide = side ?? gameSide;
  const coreList = params?.[`${coreSide}CoreList`];

  return (
    <ul className='game-board__header-cores'>
      {mainMission.cores.map((coreName, index) => (
        <li key={coreName}>
          {coreList?.includes((coreSide === 'left' ? 20 : 25) + index) && (
            <Image
              className='game-board__header-core'
              src={
                game?.mode === GameMode.決賽
                  ? `/game-source/final-cores/${coreSide}_0${index + 1}.png`
                  : `/game-source/cores/${category}_0${index + 1}.png`
              }
              alt={`核心${index + 1}`}
              width='45'
              height='45'
            />
          )}
          <Image
            src={currentMap.coreBgSrc}
            alt='核心背景'
            width='50'
            height='50'
          />
        </li>
      ))}
    </ul>
  );
};

export default CoresBar;
