export enum MonsterType {
  /** 遊蕩者: 隨機移動 */
  WANDERER = 'WANDERER',
  /** 禁錮者: 陷阱觸發 */
  IMPRISONER = 'IMPRISONER',
  /** 守護者: 核心搶答 */
  GUARDIAN = 'GUARDIAN',
  /** 隊伍搶答 */
  RACE_QUIZ = 'RACE_QUIZ',
}

export const monsterTypeDisplay = (value: MonsterType): string =>
  ({
    [MonsterType.WANDERER]: '遊蕩者',
    [MonsterType.IMPRISONER]: '禁錮者',
    [MonsterType.GUARDIAN]: '守護者',
    [MonsterType.RACE_QUIZ]: '隊伍搶答',
  }[value]);
