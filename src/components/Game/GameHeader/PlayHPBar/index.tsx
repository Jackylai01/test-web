import { DetectiveGame } from '@models/entities/game/detective-game';
import imgPlayHP from '@public/game-source/icon/player-hp.png';
import Image from 'next/image';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  playerOrder?: number;
};

const PlayHPBar = ({ playerOrder }: Props) => {
  const { game, playerOrder: gamePlayerOrder } = useAppSelector(
    (state) => state.socketGame,
  );
  const { params } = game as DetectiveGame;
  const { players } = params!;

  const currentPlayer = players[playerOrder ?? gamePlayerOrder];
  const currentPlayerHp = currentPlayer.hp < 0 ? 0 : currentPlayer.hp;

  return (
    <ul className='game-board__header-player-hp'>
      {Array.from(Array(currentPlayerHp)).map((_, index) => (
        <li key={index}>
          <Image src={imgPlayHP} alt='玩家血量' width='50' height='50' />
        </li>
      ))}
      {Array.from(Array(3 - currentPlayerHp)).map((_, index) => (
        <li key={index} className='minus'>
          <Image src={imgPlayHP} alt='玩家減少血量' width='50' height='50' />
        </li>
      ))}
    </ul>
  );
};

export default PlayHPBar;
