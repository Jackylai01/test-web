import { MonsterType } from '@enums/monster-type';

export const gameGuides = [
  '哈囉！這裡是海爾斯博士，有聽見我的聲音嗎？\n如果你能聽到我的聲音就代表穿越成功，也平安著陸了！\n如果沒有聽見…呃…願健康之心照看你！',
  '不用擔心，每個人都有第一次穿越的經驗\n接下來我會告訴你如何找到找到這次的任務目標。',
  '首先，你能看到我所準備的備忘錄，上面註記了這次遺失的核心。\n同時也註記了最基礎的知識內容，也務必請牢記在心！\n或許在某個時刻能夠派上用場！',
  '在上方你可以看見這次穿越的倒數器，\n為了不影響時空波動，請務必在時間內取得所有核心。\n如果倒數器歸零，你也將被強制召回現代，\n而你的任務就會失敗！',
  '如果你是使用電腦操作，\n可以透過鍵盤上的W、A、S、D來進行探索，並透過空白鍵來施放技能\n如果你是使用平板或手機\n可以使用左下角的觸控功能，及右下角的SKILL按鍵施放',
  '這個世界跟我們所熟知的很不一樣\n四處行走的遊盪總是不懷好意\n散落在各處還有著禁錮者的埋伏\n每個核心似乎也都被守護者所看守\n你必須運用自己的知識力量，來戰勝這一切',
  '別擔心，我會在安全的實驗室裡看著你的！\n接下來，展開你的探索吧！\n找出所有的核心，成為超時空偵探',
];

export const monsterGuide = {
  [MonsterType.WANDERER]: {
    message:
      '糟糕！被「遊蕩者」盯上了！\n要在20秒內答對三道問題\n才能擊敗遊蕩者的騷擾！',
    color: '#FF14FE',
  },
  [MonsterType.IMPRISONER]: {
    message:
      '小心！「禁錮者」出現了！\n回答禁錮者所提出的問題\n答題正確就可以通過陷阱！',
    color: '#00FDFF',
  },
  [MonsterType.GUARDIAN]: {
    message:
      '注意看，那是「守護者」！\n仔細看題目選出正確答案\n答對就可以獲得知識核心了！',
    color: '#00FF11',
  },
  [MonsterType.RACE_QUIZ]: {
    message: '',
    color: '#FFFFFF',
  },
};

export const deadGuide =
  '你已經陷入昏迷無法探索了，\n但你仍可協助你的隊友完成挑戰加油，\n一起回到現代吧！';
