import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import CoresBar from './CoresBar';
import GameTimer from './GameTimer';
import PlayHPBar from './PlayHPBar';

type Props = {
  currentMap: typeof mapSrcList[0];
  mainMission: typeof mainMissions[0];
  headerBackground: StaticImageData;
  showCoreBoot: number[];
  setShowCoreBoot: Dispatch<SetStateAction<number[]>>;
};

const GameHeader = ({
  currentMap,
  mainMission,
  headerBackground,
  showCoreBoot,
  setShowCoreBoot,
}: Props) => {
  return (
    <header className='game-board__header'>
      <Image priority src={headerBackground} alt='告示板' />
      <CoresBar currentMap={currentMap} mainMission={mainMission} />
      <GameTimer
        showCoreBoot={showCoreBoot}
        setShowCoreBoot={setShowCoreBoot}
      />
      <PlayHPBar />
    </header>
  );
};

export default GameHeader;
