import { LocalStorageKey } from '@enums/local-storage-key';
import { removeJson } from '@helpers/local-storage';
import { timeFormat } from '@helpers/time';

import { DetectiveGame } from '@models/entities/game/detective-game';
import tieBillboard from '@public/game-source/end-billboard/tie-board.png';
import tieNextBtn from '@public/game-source/end-billboard/tie-next-btn.png';
import winBillboard from '@public/game-source/end-billboard/win-board.png';
import winNextBtn from '@public/game-source/end-billboard/win-next-btn.png';
import { resetGameSetting } from '@reducers/game';
import { resetSocketGameGame } from '@reducers/socket-game';
import Image from 'next/image';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const EndBillboard = () => {
  const dispatch = useAppDispatch();

  const { game, side } = useAppSelector((state) => state.socketGame);
  const {
    category: mission,
    level: difficulty,
    winnerSide,
  } = game as DetectiveGame;

  const isTie = (winnerSide ?? 'tie') === 'tie';
  const remainingSeconds = game?.[`${side}RemainingSeconds`] ?? 600;

  return (
    <article className='end-billboard'>
      <div
        className={`end-billboard__background${
          isTie ? ' end-billboard__background--tie' : ''
        }`}
      >
        <Image src={isTie ? tieBillboard : winBillboard} alt='遊戲結束告示板' />
      </div>
      <section className='end-billboard__main'>
        {isTie ? (
          <h3>平局</h3>
        ) : (
          <h3>{game?.[`${winnerSide as 'left' | 'right'}TeamName`]}獲勝</h3>
        )}
        <span>左方：{game?.leftTeamName}</span>
        <span>右方：{game?.rightTeamName}</span>
        <span>
          關卡等級：{mission} {'I'.repeat(difficulty ?? 1)}
        </span>
        <span>剩餘時間：{timeFormat(remainingSeconds)}</span>
      </section>
      <section className='end-billboard__actions'>
        <a
          onClick={() => {
            dispatch(resetSocketGameGame());
            dispatch(resetGameSetting());
            removeJson(LocalStorageKey.ROOM_ID);
          }}
        >
          <Image src={isTie ? tieNextBtn : winNextBtn} alt='下一頁' />
        </a>
      </section>
    </article>
  );
};

export default EndBillboard;
