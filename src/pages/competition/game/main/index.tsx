import ContainerBoard from '@components/ContainerBoard';
import GameModal from '@components/Game/GameModal';
import ModeSelection from '@components/ModeSelection';

import {
  resetSocketGame,
  socketGameConnect,
  socketGameDisconnect,
} from '@reducers/socket-game';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const CompetitionGameMainPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.socketGame);

  useEffect(() => {
    dispatch(socketGameConnect());

    return () => {
      dispatch(socketGameDisconnect());
      dispatch(resetSocketGame());
    };
  }, [dispatch]);

  return (
    <>
      <ModeSelection />
      <GameModal isOpen={!!errorMessage}>
        <div style={{ margin: '10%' }}>
          <ContainerBoard title='發生錯誤'>
            <p className='margin-bottom'>{errorMessage}</p>
            <Link className='btn' href='/competition/game'>
              返回
            </Link>
          </ContainerBoard>
        </div>
      </GameModal>
    </>
  );
};

export default CompetitionGameMainPage;
