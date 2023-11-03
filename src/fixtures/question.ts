import { MonsterType } from '@enums/monster-type';

import imgMonsterGuardian from '@public/game-source/question-board/monster-guardian.png';
import imgMonsterImprisoner from '@public/game-source/question-board/monster-imprisoner.png';
import imgMonsterRaceQuiz from '@public/game-source/question-board/monster-race-quiz.png';
import imgMonsterWanderer from '@public/game-source/question-board/monster-wanderer.png';

import imgOptionGuardian from '@public/game-source/question-board/option-guardian.svg';
import imgOptionImprisoner from '@public/game-source/question-board/option-imprisoner.svg';
import imgOptionRaceQuiz from '@public/game-source/question-board/option-race-quiz.svg';
import imgOptionWanderer from '@public/game-source/question-board/option-wanderer.svg';

import imgOptionRoundGuardian from '@public/game-source/question-board/option-round-guardian.svg';
import imgOptionRoundImprisoner from '@public/game-source/question-board/option-round-imprisoner.svg';
import imgOptionRoundRaceQuiz from '@public/game-source/question-board/option-round-race-quiz.svg';
import imgOptionRoundWanderer from '@public/game-source/question-board/option-round-wanderer.svg';

import imgBackgroundCorrect from '@public/game-source/question-board/background-correct.png';
import imgBackgroundMistake from '@public/game-source/question-board/background-mistake.png';
import imgBackgroundRaceQuizFailed from '@public/game-source/question-board/background-race-quiz-failed.png';
import imgBackgroundRaceQuizSuccess from '@public/game-source/question-board/background-race-quiz-success.png';

import imgResultAttack from '@public/game-source/question-board/result-attack.png';
import imgResultBeAttacked from '@public/game-source/question-board/result-be-attacked.png';
import imgResultCoreDisappear from '@public/game-source/question-board/result-core-disappear.png';
import imgResultCoreGetting from '@public/game-source/question-board/result-core-getting.png';
import imgResultMoveBack from '@public/game-source/question-board/result-move-back.png';
import imgResultTrapFellIn from '@public/game-source/question-board/result-trap-fell-in.png';
import imgResultTrapPass from '@public/game-source/question-board/result-trap-pass.png';

export const questionThemeMap = {
  [MonsterType.WANDERER]: {
    bgQuestion: imgMonsterWanderer,
    bgOption: imgOptionWanderer,
    bgOptionRound: imgOptionRoundWanderer,
    colorText: '#1F6E72',
  },
  [MonsterType.IMPRISONER]: {
    bgQuestion: imgMonsterImprisoner,
    bgOption: imgOptionImprisoner,
    bgOptionRound: imgOptionRoundImprisoner,
    colorText: '#721F64',
  },
  [MonsterType.GUARDIAN]: {
    bgQuestion: imgMonsterGuardian,
    bgOption: imgOptionGuardian,
    bgOptionRound: imgOptionRoundGuardian,
    colorText: '#2b721f',
  },
  [MonsterType.RACE_QUIZ]: {
    bgQuestion: imgMonsterRaceQuiz,
    bgOption: imgOptionRaceQuiz,
    bgOptionRound: imgOptionRoundRaceQuiz,
    colorText: '#947326',
  },
};

export const answerResultMap = {
  發動攻擊: { background: imgBackgroundCorrect, text: imgResultAttack },
  遭受攻擊: { background: imgBackgroundMistake, text: imgResultBeAttacked },
  通過陷阱: { background: imgBackgroundCorrect, text: imgResultTrapPass },
  陷入陷阱: { background: imgBackgroundMistake, text: imgResultTrapFellIn },
  取得核心: { background: imgBackgroundCorrect, text: imgResultCoreGetting },
  核心消失: { background: imgBackgroundMistake, text: imgResultCoreDisappear },
  搶答成功: { background: imgBackgroundRaceQuizSuccess, text: imgResultAttack },
  搶答失敗: {
    background: imgBackgroundRaceQuizFailed,
    text: imgResultMoveBack,
  },
  搶答答錯: { background: imgBackgroundMistake, text: imgResultMoveBack },
};

export const questions = [
  {
    question: '菸品燃燒所產生的物質中，下面哪一種物質是造成口腔癌的主要原因？',
    options: ['一氧化碳', '菸焦油', '尼古丁', '甲烷'],
    answer: 1,
  },
];
