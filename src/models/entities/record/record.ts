export type Record = {
  _id: string;
  area: string;
  schoolCode: string;
  teamId: string;
  teamName: string;
  quizList: Quiz[];
  leftSideUsers: LeftSideUser[];
  result: string;
  remainingSeconds: number;
  createAt: Date;
  finishAt: Date;
  isFinished: boolean;
};

export type LeftSideUser = {
  _id: string;
  uuid: string;
  account: string;
  name: string;
  ip: string;
  className: number;
  isReady: boolean;
  selected: boolean;
};

export type Quiz = {
  _id: string;
  no: number;
  category: string;
  subcategory: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  options: Option[];
  correctAnswer: number;
  explanation: string;
  leftUserId: string;
  rightUserId: null;
  leftAnswer: number;
  rightAnswer: number;
};

export enum Difficulty {
  中 = '中',
  易 = '易',
}

export type Option = {
  no: number;
  option: string;
};

export enum Type {
  是非 = '是非',
  選擇 = '選擇',
}
