import { monsterSrc } from '@fixtures/character';
import { Monster } from '@helpers/game';

import Image from 'next/image';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  gridSize: number;
  monster: Monster;
  behavior: number;
};

const MonsterItem = ({ gridSize, monster, behavior }: Props) => {
  const isMonsterDead = monster.hp <= 0;

  const { isViewer } = useAppSelector((state) => state.socketGame);

  if (isMonsterDead) return <></>;

  return (
    <li
      style={{
        transform: `translate3D(${
          (monster.stopPosition
            ? monster.stopPosition.y
            : monster.behaviorPattern[behavior].y) *
            gridSize +
          'px'
        },${
          (monster.stopPosition
            ? monster.stopPosition.x
            : monster.behaviorPattern[behavior].x) *
            gridSize -
          gridSize * 0.2 +
          'px'
        },0)`,
        width: gridSize,
        height: gridSize * 1.2,
      }}
    >
      <Image
        src={
          isViewer
            ? monsterSrc.avatarLeft
            : monsterSrc.animation[
                monster.stopPosition
                  ? monster.stopPosition.direction
                  : monster.behaviorPattern[behavior].direction
              ]
        }
        alt='遊蕩者'
        priority
      />
    </li>
  );
};

export default MonsterItem;
