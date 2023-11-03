import LoadingBlock from '@components/LoadingBlock';
import { LocalStorageKey } from '@enums/local-storage-key';
import { MonsterType } from '@enums/monster-type';
import { questionThemeMap } from '@fixtures/question';
import { betweenMs } from '@helpers/date';
import { getBehaviorPattern } from '@helpers/game';
import {
  checkOrderState,
  findRandomEmptyPosition,
  randomSpace,
} from '@helpers/gameMap';
import { removeJson } from '@helpers/local-storage';

import type { DetectiveGame } from '@models/entities/game/detective-game';
import { Type as QuizType } from '@models/entities/record/record';
import {
  AnswerResultType,
  GameModalType,
  setAnswerCorrectCounter,
  setAnswerResultType,
  setGameModalType,
} from '@reducers/game';
import {
  socketGameAddTimeAsync,
  socketGameAnswerQuizAsync,
  socketGameUpdateCoreListAsync,
  socketGameUpdateOneMonsterAsync,
  socketGameUpdateOnePlayerAsync,
} from '@reducers/socket-game/actions';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useGame from 'src/hook/useGame';

type Props = {
  setCoolDownTimeOut: (value: number) => void;
  setPartialEventMap: (x: number, y: number, stateNumber: number) => void;
};

const QuestionBoard = ({ setCoolDownTimeOut, setPartialEventMap }: Props) => {
  const dispatch = useAppDispatch();
  const { isFinal } = useGame();

  const { game, side, playerOrder } = useAppSelector(
    (state) => state.socketGame,
  );
  const { quizList, params } = game as DetectiveGame;
  const { eventMap, monsters, players } = params!;
  const currentPlayer = players[playerOrder];
  const currentCorner = params![`${side}Corner`];
  const otherSide = side === 'left' ? 'right' : 'left';

  const {
    monsterType,
    wandererOrder,
    coreType,
    isAnswerTimeout,
    answerCorrectCounter,
  } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.clientAuth);

  const [countdown, setCountdown] = useState<number>();

  const quiz = useMemo(() => {
    if (monsterType === MonsterType.RACE_QUIZ) {
      const userQuizList = quizList
        .slice(30 * 6)
        .filter(
          (quiz) =>
            quiz[`${side}UserId`] === user?._id &&
            !!quiz[`${otherSide}UserId`] &&
            !quiz[`${side}Answer`],
        );
      const lastQuiz = userQuizList[userQuizList.length - 1];
      return lastQuiz;
    }

    return quizList.slice(30 * playerOrder).find(
      (quiz) =>
        // quiz[`${side}UserId`] === user?._id &&
        !quiz[`${side}Answer`],
    );
  }, [monsterType, otherSide, playerOrder, quizList, side, user?._id]);

  const { bgQuestion, bgOption, bgOptionRound, colorText } =
    questionThemeMap[monsterType!];

  // useEffect(() => {
  //   if (quiz) return;
  //   dispatch(socketGameGetQuizAsync());
  // }, [dispatch, quiz]);

  useEffect(() => {
    if (monsterType !== MonsterType.RACE_QUIZ) return;
    const countdown = betweenMs(new Date(), currentPlayer.raceQuizEndTime);
    setCountdown(Math.round(countdown / 1000) || 0);

    const interval = setInterval(() => {
      const countdown =
        new Date(currentPlayer.raceQuizEndTime).getTime() -
        new Date().getTime();
      setCountdown(Math.round(countdown / 1000) || 0);
    }, 1000);

    const timer = setTimeout(() => {
      dispatch(setAnswerResultType(AnswerResultType.搶答失敗));
      dispatch(
        socketGameUpdateOnePlayerAsync({
          index: playerOrder,
          player: {
            ...currentPlayer,
            hp: currentPlayer.hp - 1,
            currentPosition: randomSpace(eventMap, currentCorner),
            currentDirection: 'bottom',
            isRaceQuiz: false,
          },
        }),
      );
    }, countdown);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer.raceQuizEndTime]);

  const selectOption = (optionIndex: number) => {
    const quizIndex = quizList
      .map((quiz) => quiz._id)
      .lastIndexOf(quiz?._id || '');
    dispatch(
      socketGameAnswerQuizAsync({
        quizIndex,
        answer: optionIndex,
        core: coreType,
      }),
    );

    const isCorrect = optionIndex === quiz?.correctAnswer;
    switch (monsterType) {
      case MonsterType.RACE_QUIZ: {
        if (isCorrect) {
          dispatch(setAnswerResultType(AnswerResultType.搶答成功));
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: { ...currentPlayer, isRaceQuiz: false },
            }),
          );
          if (quiz[`${otherSide}Answer`]) break;
          const otherSideCorder = params![`${otherSide}Corner`];
          const competitorIndex =
            (otherSide === 'left' ? 0 : game!.leftSideUsers?.length ?? 0) +
            game![`${otherSide}SideUsers`]!.findIndex(
              (user: { _id: string }) =>
                user._id === quiz?.[`${otherSide}UserId`],
            );
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: competitorIndex,
              player: {
                ...players[competitorIndex],
                hp: players[competitorIndex].hp - 1,
                currentPosition: randomSpace(eventMap, otherSideCorder),
                currentDirection: 'bottom',
                isRaceQuiz: false,
              },
            }),
          );
        } else {
          dispatch(setAnswerResultType(AnswerResultType.搶答答錯));
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: {
                ...currentPlayer,
                hp: currentPlayer.hp - 1,
                currentPosition: randomSpace(eventMap, currentCorner),
                currentDirection: 'bottom',
                isRaceQuiz: false,
              },
            }),
          );
        }
        break;
      }

      case MonsterType.WANDERER: {
        if (wandererOrder === null) return;
        const currentWander = monsters[wandererOrder];
        if (isCorrect) {
          if (!isFinal && currentWander.hp === 1 && !isAnswerTimeout) {
            setTimeout(() => {
              dispatch(socketGameAddTimeAsync({ seconds: 20 }));
            }, 1000);
          }

          dispatch(
            socketGameUpdateOneMonsterAsync({
              index: wandererOrder,
              monster: { ...currentWander, hp: currentWander.hp - 1 },
            }),
          );
          dispatch(setAnswerCorrectCounter(answerCorrectCounter + 1));
          dispatch(setAnswerResultType(AnswerResultType.發動攻擊));
        } else {
          dispatch(
            socketGameUpdateOnePlayerAsync({
              index: playerOrder,
              player: { ...currentPlayer, hp: currentPlayer.hp - 1 },
            }),
          );
          if (currentPlayer.hp - 1 === 0) {
            dispatch(
              socketGameUpdateOneMonsterAsync({
                index: wandererOrder,
                monster: {
                  ...currentWander,
                  stopPosition: undefined,
                  behaviorPattern: getBehaviorPattern(
                    findRandomEmptyPosition(eventMap),
                    eventMap,
                  ),
                },
              }),
            );
          }
          dispatch(setAnswerResultType(AnswerResultType.遭受攻擊));
        }
        break;
      }

      case MonsterType.IMPRISONER: {
        if (isCorrect) {
          if (!isFinal && !isAnswerTimeout) {
            setTimeout(() => {
              dispatch(socketGameAddTimeAsync({ seconds: 10 }));
            }, 1000);
          }

          dispatch(setAnswerResultType(AnswerResultType.通過陷阱));
        } else {
          setCoolDownTimeOut(3000);
          dispatch(setAnswerResultType(AnswerResultType.陷入陷阱));
        }
        break;
      }

      case MonsterType.GUARDIAN: {
        if (isCorrect) {
          dispatch(socketGameUpdateCoreListAsync({ core: coreType! }));
          dispatch(setAnswerResultType(AnswerResultType.取得核心));
        } else {
          dispatch(setAnswerResultType(AnswerResultType.核心消失));
          if (coreType) {
            if (!checkOrderState(eventMap, coreType)) {
              const [x, y] = findRandomEmptyPosition(eventMap);
              setPartialEventMap(x, y, coreType);
            }
          }
        }
        removeJson(LocalStorageKey.Last_LOST_CORE);
        break;
      }
    }
    dispatch(setGameModalType(GameModalType.攻擊特效));
  };

  if (
    !quiz ||
    (monsterType === MonsterType.RACE_QUIZ &&
      betweenMs(new Date(), currentPlayer.raceQuizEndTime) >= 29 * 1000)
  ) {
    return <LoadingBlock />;
  }

  return (
    <article className='question-board'>
      <div className='question-board__background'>
        <Image src={bgQuestion} alt='問題背景' width={900} height={623} />
      </div>
      <section
        className={`question-board__main${
          monsterType === MonsterType.RACE_QUIZ
            ? ' question-board__main--race-quiz'
            : ''
        }`}
        style={{ color: colorText, marginRight: 100 }}
      >
        {quiz.question}
        {currentPlayer.raceQuizEndTime && (
          <span className='question-board__countdown'>{countdown}</span>
        )}
        <ol className='question-board__options'>
          {quiz.options.map(({ no, option }) => (
            <li
              key={no}
              className={quiz.type === QuizType.是非 ? 'round' : undefined}
              onClick={() => selectOption(no)}
            >
              {quiz.type === QuizType.是非 ? (
                <>
                  <Image src={bgOptionRound} alt='選項背景' />
                  <b>{option}</b>
                </>
              ) : (
                <>
                  <Image src={bgOption} alt='選項背景' />
                  <span>{String.fromCharCode(65 + no - 1)}</span>
                  <b>{option}</b>
                </>
              )}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default QuestionBoard;
