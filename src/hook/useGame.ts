import { DetectiveGame, GameMode } from '@models/entities/game/detective-game';
import useAppSelector from './useAppSelector';

const useGame = () => {
  const { mode } = useAppSelector((state) => state.game);
  const { game, playerOrder } = useAppSelector((state) => state.socketGame);
  const { params } = game as DetectiveGame;
  const { players } = params!;

  const isFinal = mode === GameMode.決賽;

  const currentPlayer = players[playerOrder];

  return { isFinal, currentPlayer };
};

export default useGame;
