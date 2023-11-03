import { EventItem } from '@enums/event-item';
import { mapSrcList } from '@fixtures/map';
import { sideUpperCase } from '@helpers/game';

import { DetectiveGame, GameMode } from '@models/entities/game/detective-game';
import Image from 'next/image';
import useAppSelector from 'src/hook/useAppSelector';

interface Props {
  state: number;
  showTrap: boolean;
  currentSrcMap: (typeof mapSrcList)[0];
}

const MapItem = ({ state, showTrap, currentSrcMap }: Props) => {
  const { game, side, isViewer } = useAppSelector((state) => state.socketGame);
  const { category, params } = game as DetectiveGame;
  const { leftCoreList, rightCoreList } = params!;

  switch (state) {
    case EventItem.NEW_EMPTY:
      return (
        <span className='block'>
          {currentSrcMap.emptySrc && (
            <Image src={currentSrcMap.emptySrc} alt='佔用格' />
          )}
        </span>
      );
    case EventItem.OBSTACLE:
      return (
        <span className='block'>
          {currentSrcMap.obstacleSrc && (
            <Image src={currentSrcMap.obstacleSrc} alt='佔用格' />
          )}
        </span>
      );
    case EventItem.CORE_1_LEFT:
    case EventItem.CORE_2_LEFT:
    case EventItem.CORE_3_LEFT:
    case EventItem.CORE_4_LEFT:
    case EventItem.CORE_5_LEFT:
    case EventItem.CORE_1_RIGHT:
    case EventItem.CORE_2_RIGHT:
    case EventItem.CORE_3_RIGHT:
    case EventItem.CORE_4_RIGHT:
    case EventItem.CORE_5_RIGHT:
      if (leftCoreList.includes(state) || rightCoreList.includes(state)) {
        return null;
      }
      if (
        !isViewer &&
        ((side === 'left' && state > EventItem.CORE_5_LEFT) ||
          (side === 'right' && state < EventItem.CORE_1_RIGHT))
      ) {
        return null;
      }

      return (
        <span className={`cores cores-${state}`}>
          <Image
            src={
              game?.mode === GameMode.決賽
                ? `/game-source/final-cores/${state < 25 ? 'left' : 'right'}_0${
                    state - (state < 25 ? 20 : 25) + 1
                  }.png`
                : `/game-source/cores/${category}_0${state - 20 + 1}.png`
            }
            alt={`核心${state - (side === 'left' ? 20 : 25) + 1}`}
            width='250'
            height='250'
          />
        </span>
      );
    case EventItem.TRAP:
      return <span className={`trap${showTrap ? ' active' : ''}`}></span>;
    case EventItem.TRAP_LEFT:
      return side === 'left' ? (
        <span className={`trap-ice${showTrap ? ' active' : ''}`}></span>
      ) : (
        <></>
      );
    case EventItem.TRAP_RIGHT:
      return side === 'right' ? (
        <span className={`trap-ice${showTrap ? ' active' : ''}`}></span>
      ) : (
        <></>
      );
    case EventItem.TIME_MACHINE_LEFT:
    case EventItem.TIME_MACHINE_RIGHT:
      return (
        <span
          className={`time-machine${
            isViewer ||
            state === EventItem[`TIME_MACHINE_${sideUpperCase(side)}`]
              ? ' active'
              : ''
          }`}
        >
          <Image
            src={`/game-source/time-machine/${
              state === EventItem.TIME_MACHINE_LEFT ? 'left' : 'right'
            }.png`}
            alt='時光機'
            width='250'
            height='250'
          />
        </span>
      );
    default:
      return <></>;
  }
};

export default MapItem;
