import { resetClientGameStatus } from '@reducers/client/game';
import { clientGameGameInfoAsync } from '@reducers/client/game/actions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuth from 'src/hook/useAuth';

type Props = {
  children?: React.ReactNode;
};

const GameLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useAuth();
  const router = useRouter();

  const {
    status: { gameInfoLoading },
  } = useAppSelector((state) => state.clientGame);

  useEffect(() => {
    if (gameInfoLoading) return;
    dispatch(clientGameGameInfoAsync());

    return () => {
      dispatch(resetClientGameStatus());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const backgroundMusic: HTMLAudioElement | null =
      document.querySelector('#background-music');
    if (backgroundMusic) {
      backgroundMusic.play();
    }
  }, [router]);

  return (
    <>
      {children}
      <audio id='background-music' autoPlay loop>
        <source src='/game-source/sound/背景音樂.mp3' type='audio/mpeg' />
      </audio>
    </>
  );
};

export default GameLayout;
