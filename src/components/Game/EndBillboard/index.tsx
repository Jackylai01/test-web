import { timeFormat } from '@helpers/time';

import { DetectiveGame } from '@models/entities/game/detective-game';
import loseBillboard from '@public/game-source/end-billboard/lose-board.png';
import loseLogBtn from '@public/game-source/end-billboard/lose-log-btn.png';
import loseNextBtn from '@public/game-source/end-billboard/lose-next-btn.png';
import tieBillboard from '@public/game-source/end-billboard/tie-board.png';
import tieLogBtn from '@public/game-source/end-billboard/tie-log-btn.png';
import tieNextBtn from '@public/game-source/end-billboard/tie-next-btn.png';
import winBillboard from '@public/game-source/end-billboard/win-board.png';
import winLogBtn from '@public/game-source/end-billboard/win-log-btn.png';
import winNextBtn from '@public/game-source/end-billboard/win-next-btn.png';
import { GameModalType, setGameModalType } from '@reducers/game';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const EndBillboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { game, side } = useAppSelector((state) => state.socketGame);
  const {
    category: mission,
    level: difficulty,
    teamName,
    winnerSide,
  } = game as DetectiveGame;

  const isWinOrLose = (winnerSide ?? 'tie') === side;
  const isTie = (winnerSide ?? 'tie') === 'tie';
  const remainingSeconds = game?.[`${side}RemainingSeconds`] ?? 600;

  return (
    <article
      className={`end-billboard end-billboard${isWinOrLose ? '' : '--lose'}`}
    >
      <div
        className={`end-billboard__background${
          isTie ? ' end-billboard__background--tie' : ''
        }`}
      >
        <Image
          src={
            isTie ? tieBillboard : isWinOrLose ? winBillboard : loseBillboard
          }
          alt='遊戲結束告示板'
        />
      </div>
      <section className='end-billboard__main'>
        {isTie ? <h3>平局</h3> : <h3>挑戰{isWinOrLose ? '成功' : '失敗'}</h3>}
        <span>挑戰者：{teamName || game?.[`${side}TeamName`]}</span>
        <span>
          關卡等級：{mission} {'I'.repeat(difficulty ?? 1)}
        </span>
        <span>剩餘時間：{timeFormat(remainingSeconds)}</span>
      </section>
      <section className='end-billboard__actions'>
        <a onClick={() => dispatch(setGameModalType(GameModalType.答題回顧))}>
          <Image
            src={isTie ? tieLogBtn : isWinOrLose ? winLogBtn : loseLogBtn}
            alt='答題回顧'
          />
        </a>
        <a href={`${router.basePath}/competition/game`}>
          <Image
            src={isTie ? tieNextBtn : isWinOrLose ? winNextBtn : loseNextBtn}
            alt='下一頁'
          />
        </a>
      </section>
    </article>
  );
};

export default EndBillboard;
