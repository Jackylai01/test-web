import { Monster } from '@helpers/game';

import {
  DetectiveGame,
  DetectiveGamePhase,
} from '@models/entities/game/detective-game';
import { setMonstersPosition } from '@reducers/game';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import MonsterItem from './MonsterItem';

type Props = { gridSize: number; monsters: Monster[] };

const Monsters = ({ gridSize, monsters }: Props) => {
  const dispatch = useAppDispatch();
  const { game } = useAppSelector((state) => state.socketGame);
  const { leftPhase, leftRemainingSeconds, params } = game as DetectiveGame;

  const [lastBehavior, setLastBehavior] = useState<number>(
    600 - leftRemainingSeconds,
  );

  const isEndGame = leftPhase === DetectiveGamePhase.遊戲結束;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!monsters) return;

      dispatch(
        setMonstersPosition(
          monsters.map((monster) => monster.behaviorPattern[lastBehavior]),
        ),
      );

      setLastBehavior((prevValue) => prevValue + 1);
    }, 1000);

    if (isEndGame || monsters.length === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isEndGame, lastBehavior, monsters]);

  return (
    <ul className='game-board__other-player'>
      {monsters.map((monster, index) => (
        <MonsterItem
          key={index}
          gridSize={gridSize}
          monster={monster}
          behavior={lastBehavior}
        />
      ))}
    </ul>
  );
};

export default Monsters;
