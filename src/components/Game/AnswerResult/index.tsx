import { MonsterType } from '@enums/monster-type';
import { mainMissions } from '@fixtures/main-mission';
import { answerResultMap } from '@fixtures/question';

import { DetectiveGame } from '@models/entities/game/detective-game';
import imgPlusTen from '@public/game-source/icon/push-10.png';
import imgPlusTwenty from '@public/game-source/icon/push-20.png';
import {
  AnswerResultType,
  GameModalType,
  setAnswerCorrectCounter,
  setAnswerResultType,
  setGameModalType,
  setIsAnswering,
  setIsAnswerTimeout,
  setMonsterType,
} from '@reducers/game';
import {
  socketGameUpdateOneMonsterAsync,
  socketGameUpdateOnePlayerAsync,
} from '@reducers/socket-game/actions';
import Image from 'next/image';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useGame from 'src/hook/useGame';

type Props = {
  mainMission: (typeof mainMissions)[0];
};

const AnswerResult = ({ mainMission }: Props) => {
  const dispatch = useAppDispatch();
  const { isFinal, currentPlayer } = useGame();

  const { game, playerOrder } = useAppSelector((state) => state.socketGame);
  const { params } = game as DetectiveGame;
  const { monsters } = params!;

  const {
    answerResultType,
    monsterType,
    wandererOrder,
    coreType,
    isAnswerTimeout,
  } = useAppSelector((state) => state.game);

  const answerResult = answerResultMap[answerResultType!];
  const coreName = mainMission.cores[coreType! - 20] || `核心${coreType! - 19}`;
  const isWandererDead =
    wandererOrder !== null && monsters[wandererOrder].hp <= 0;
  const isPlayerDead = currentPlayer.hp <= 0;
  const showAddTime =
    monsterType === MonsterType.WANDERER
      ? isWandererDead && !isAnswerTimeout
      : !isAnswerTimeout;

  return (
    <article
      className='question-board'
      onClick={() => {
        if (isPlayerDead) {
          dispatch(setGameModalType(GameModalType.死亡說明));
        } else if (monsterType === MonsterType.WANDERER && !isWandererDead) {
          dispatch(setGameModalType(GameModalType.怪物問題));
          dispatch(setMonsterType(MonsterType.WANDERER));
        } else {
          dispatch(setGameModalType(null));
          dispatch(setMonsterType(null));
          dispatch(setIsAnswering(false));
          dispatch(setIsAnswerTimeout(false));
          dispatch(setAnswerCorrectCounter(0));
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: { ...currentPlayer, isAnswering: false },
            }),
          );
        }

        if (isPlayerDead || isWandererDead) {
          if (wandererOrder === null) return;
          dispatch(
            socketGameUpdateOneMonsterAsync({
              index: wandererOrder,
              monster: { ...monsters[wandererOrder], stopPosition: undefined },
            }),
          );
        }
        dispatch(setAnswerResultType(null));
      }}
    >
      <p
        className={`question-board__add-time${
          showAddTime && !isFinal ? ' active' : ''
        }`}
      >
        {answerResultType === AnswerResultType.通過陷阱 && (
          <Image src={imgPlusTen} alt='加十秒' width='60' height='60' />
        )}
        {answerResultType === AnswerResultType.發動攻擊 && (
          <Image src={imgPlusTwenty} alt='加二十秒' width='60' height='60' />
        )}
      </p>
      <div className='question-board__background question-board__background--result'>
        <Image src={answerResult.background} alt={answerResultType!} />
      </div>
      <section className='question-board__main question-board__main--result'>
        <Image src={answerResult.text} alt={answerResultType!} />
        {answerResultType === AnswerResultType.取得核心 && (
          <p className='question-board__core-name'>《{coreName}》</p>
        )}
      </section>
    </article>
  );
};

export default AnswerResult;
