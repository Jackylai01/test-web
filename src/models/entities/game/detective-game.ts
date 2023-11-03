import { EventItem } from '@enums/event-item';
import { mainMissions } from '@fixtures/main-mission';
import { mapSrcList } from '@fixtures/map';
import { Monster } from '@helpers/game';
import { Quiz } from '../record/record';
import { BaseEntity } from '../shared/base-entity';
import { GameUser } from './game-user';

export enum GameMode {
  /** 1(個人):1(電腦) */
  個人賽 = '個人賽',
  /** 3(學生):1(電腦) */
  校園初賽 = '校園初賽',
  /** 3(A隊學生):3(B隊學生) */
  決賽 = '決賽',
}

export enum DetectiveGamePhase {
  創建房間 = '創建房間',
  選擇題型 = '選擇題型',
  選擇難度 = '選擇難度',
  選擇登場角色 = '選擇登場角色',
  遊戲開始 = '遊戲開始',
  遊戲結束 = '遊戲結束',
}

export enum DetectiveGameResult {
  挑戰成功 = '挑戰成功',
  挑戰失敗 = '挑戰失敗',
  左側勝利 = '左側勝利',
  右側勝利 = '右側勝利',
}

export enum DetectiveQuizCategory {
  食品安全 = '食品安全',
  健康促進 = '健康促進',
  菸害防制 = '菸害防制',
  傳染病防治 = '傳染病防治',
  慢性病防治 = '慢性病防治',
  合理就醫 = '合理就醫',
  病人安全 = '病人安全',
  化粧品安全 = '化粧品安全',
  心理衛生 = '心理衛生',
  緊急救護 = '緊急救護',
  動健康 = '動健康',
  毒品危害防制 = '毒品危害防制',
  長期照顧 = '長期照顧',
  藥物安全 = '藥物安全',
}

export const DetectiveQuizCategoryList = [
  DetectiveQuizCategory.緊急救護,
  DetectiveQuizCategory.合理就醫,
  DetectiveQuizCategory.病人安全,
  DetectiveQuizCategory.化粧品安全,
  DetectiveQuizCategory.食品安全,
  DetectiveQuizCategory.藥物安全,
  DetectiveQuizCategory.長期照顧,
  DetectiveQuizCategory.動健康,
  DetectiveQuizCategory.菸害防制,
  DetectiveQuizCategory.健康促進,
  DetectiveQuizCategory.慢性病防治,
  DetectiveQuizCategory.傳染病防治,
  DetectiveQuizCategory.心理衛生,
  DetectiveQuizCategory.毒品危害防制,
];

export enum Corner {
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomLeft = 'BottomLeft',
  BottomRight = 'BottomRight',
}

export class DetectiveGame extends BaseEntity {
  /** 使用者 ID */
  userId?: string;
  /** 遊戲模式 */
  mode!: GameMode;
  /** 遊戲階段 (左) */
  leftPhase!: DetectiveGamePhase;
  /** 遊戲階段 (右) */
  rightPhase!: DetectiveGamePhase;
  /** 是否準備 (左) */
  isLeftReady?: boolean;
  /** 是否準備 (右) */
  isRightReady?: boolean;
  /** 難度 */
  level?: number;
  /** 關卡 */
  category?: DetectiveQuizCategory;
  /** 問題列表 */
  quizList!: Quiz[];
  /** 角色列表 (左) */
  leftSide!: string[];
  /** 角色列表 (右) */
  rightSide!: string[];
  /** 玩家列表 (左) */
  leftSideUsers?: GameUser[];
  /** 玩家列表 (右) */
  rightSideUsers?: GameUser[];
  /** 遊戲結果 */
  result?: DetectiveGameResult;
  /** 結束時間 (左) */
  leftTimer!: Date;
  /** 結束時間 (右) */
  rightTimer!: Date;
  /** 剩餘時間 (左) */
  leftRemainingSeconds!: number;
  /** 剩餘時間 (右) */
  rightRemainingSeconds!: number;
  /** 遊戲參數 (地圖/收集物/技能/遊蕩者) */
  params?: DetectiveGameParams;
  /** 是否遊戲結束 */
  isFinished!: boolean;
  /** 遊戲結束時間 */
  finishAt?: Date;
  /** 獲勝方 */
  winnerSide?: 'left' | 'right' | 'tie';
  /** 地區 */
  area?: string;
  /** 學校編號 */
  schoolCode?: string;
  /** 學校名稱 */
  schoolName?: string;
  /** 隊伍 ID */
  teamId?: string;
  /** 隊伍名稱 */
  teamName?: string;
  /** 刪除時間 */
  deleteAt?: Date;
  leftTeamId?: string;
  leftTeamName?: string;
  rightTeamId?: string;
  rightTeamName?: string;
  code?: number;
}

export class DetectiveGameParams {
  /** 原始地圖 */
  currentMap!: (typeof mapSrcList)[0];
  /** 事件地圖 */
  eventMap!: number[][];
  /** 任務資訊 */
  mainMission!: (typeof mainMissions)[0];
  /** 核心列表 (左) */
  leftCoreList!: EventItem[];
  /** 核心列表 (右) */
  rightCoreList!: EventItem[];
  /** 核心紀錄 */
  coreLogs!: {
    core: EventItem;
    position: number[];
    playerOrder: number;
    timestamp: Date;
  };
  /** 怪物列表 */
  monsters!: Monster[];
  /** 角色資訊列表 */
  players!: DetectiveGameParamsPlayer[];
  /** 左方初始角落 */
  leftCorner!: Corner;
  /** 右方初始角落 */
  rightCorner!: Corner;
  /** 左方停止結束時間 */
  leftStopEndTime?: Date;
  /** 右方停止結束時間 */
  rightStopEndTime?: Date;
  [key: string]: any;
}

export class DetectiveGameParamsPlayer {
  /** 當前位置 */
  currentPosition: number[] = [7, 8];
  /** 當前方向 */
  currentDirection: string = 'bottom';
  /** 技能次數 */
  skillCount: number = 1;
  /** 冷卻時間 */
  coolDownTime: number = 0;
  /** 血量 */
  hp: number = 3;
  /** 正在答題 */
  isAnswering: boolean = false;
  /** 正在搶答 */
  isRaceQuiz: boolean = false;
  /** 搶答結束時間 */
  raceQuizEndTime: Date = new Date();
}

export class remainingSeconds {
  leftRemainingSeconds: number = 0;
  rightRemainingSeconds: number = 0;
}

export class DetectiveGameRanking {
  areaRanking: {
    name: string;
    remainingSeconds: number;
  }[] = [];
  schoolRanking: {
    area: string;
    name: string;
    remainingSeconds: number;
  }[] = [];
  teamRanking: {
    schoolName: string;
    area: string;
    name: string;
    remainingSeconds: number;
  }[] = [];
}
