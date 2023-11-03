import Image from 'next/image';

import ContainerBoard from '@components/ContainerBoard';
import { MonsterType } from '@enums/monster-type';
import { deadGuide, gameGuides, monsterGuide } from '@fixtures/doctor-message';
import { checkMobileDevice } from '@helpers/check';

import doctorAvatar from '@public/game-source/doctor-message/doctor-avatar.png';
import {
  GameModalType,
  setGameModalType,
  setIsAnswering,
  setIsGameStart,
} from '@reducers/game';
import { socketGameUpdateOnePlayerAsync } from '@reducers/socket-game/actions';
import { useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useGame from 'src/hook/useGame';

type Props = {
  messageType: 'gameGuide' | MonsterType | 'deadGuide';
};

const DoctorMessage = ({ messageType }: Props) => {
  const dispatch = useAppDispatch();
  const { currentPlayer } = useGame();

  const { playerOrder } = useAppSelector((state) => state.socketGame);

  const [currentIndex, setCurrentIndex] = useState(0);

  const isGameGuide = messageType === 'gameGuide';
  const isDeadGuide = messageType === 'deadGuide';

  const onGuideClick = () => {
    if (currentIndex + 1 < gameGuides.length) {
      setCurrentIndex((prevValue) => prevValue + 1);
      return;
    }

    gameStart();
  };

  const gameStart = () => {
    dispatch(
      setGameModalType(!checkMobileDevice() ? GameModalType.操作說明 : null),
    );
    dispatch(setIsGameStart(true));
  };

  const onMonsterClick = () => {
    dispatch(setIsAnswering(true));
    dispatch(setGameModalType(GameModalType.怪物問題));
    dispatch(
      socketGameUpdateOnePlayerAsync({
        index: playerOrder,
        player: { ...currentPlayer, isAnswering: true },
      }),
    );
  };

  return (
    <article
      className='doctor-message'
      onClick={
        isGameGuide ? onGuideClick : isDeadGuide ? undefined : onMonsterClick
      }
    >
      <Image
        className='doctor-message__doctor-avatar'
        src={doctorAvatar}
        alt='博士頭像'
      />
      <ContainerBoard title='來自海爾斯博士的訊息'>
        {isGameGuide ? (
          <>
            <a className='doctor-message__skip' onClick={gameStart}>
              《直接跳過》
            </a>
            {gameGuides[currentIndex]}
            <span className='doctor-message__click-hint'>
              《點擊滑鼠繼續 {currentIndex + 1}/{gameGuides.length}》
            </span>
          </>
        ) : isDeadGuide ? (
          <span>{deadGuide}</span>
        ) : (
          <>
            <span style={{ color: monsterGuide[messageType].color }}>
              {monsterGuide[messageType].message}
            </span>
            <span className='doctor-message__click-hint doctor-message__click-hint--white'>
              《點擊滑鼠繼續》
            </span>
          </>
        )}
      </ContainerBoard>
    </article>
  );
};

export default DoctorMessage;
