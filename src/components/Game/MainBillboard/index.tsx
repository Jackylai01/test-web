import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';
import { GameModalType, setGameModalType } from '@reducers/game';
import Image from 'next/image';
import useAppDispatch from 'src/hook/useAppDispatch';
import useGame from 'src/hook/useGame';

type Props = {
  currentMap: (typeof mapSrcList)[0];
  mainMission: (typeof mainMissions)[0];
};

const MainBillboard = ({ currentMap, mainMission }: Props) => {
  const dispatch = useAppDispatch();

  const { isFinal } = useGame();

  return (
    <article className='main-billboard'>
      <section className='main-billboard__background'>
        <Image
          src={currentMap.billboardSrc}
          alt='告示板'
          width='850'
          onClick={() => dispatch(setGameModalType(GameModalType.遊戲說明))}
        />
      </section>
      <section className='main-billboard__main'>
        {mainMission?.question}
        <br />
        <br />
        請找出相關核心：
        <br />
        {mainMission?.cores.join('、')}
      </section>
    </article>
  );
};

export default MainBillboard;
