export type GameInfo = {
  unlimitedCount: boolean;
  registerStartDate: Date;
  registerEndDate: Date;
  individualStartDate: Date;
  individualEndDate: Date;
  preliminaryStartDate: Date;
  preliminaryEndDate: Date;
  isRegisterAvailable: boolean;
  isIndividualAvailable: boolean;
  isPreliminaryAvailable: null;
  detectiveStagesProgress: DetectiveStagesProgress[];
  isReadyToFinish: boolean;
  allStagesFinished: boolean;
  allStagesFinishAt: null;
  fragments: number;
  fragmentsRemaining: number;
  fragmentsUsed: number;
  points: number;
  balance: number;
  gameCount: number;
  characters: { [key: string]: string };
  ip: string;
};

export type DetectiveStagesProgress = {
  no: number;
  category: string;
  process: number[];
};
