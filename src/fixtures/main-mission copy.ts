import { DetectiveQuizCategory } from '@models/entities/game/detective-game';

export const mainMissions = [
  {
    mission: DetectiveQuizCategory.菸害防制,
    question:
      '世界衛生組織已發表聲明，認為所有形式的菸品，均會對人體產生危害，包含了：傳統紙菸、電子煙、加熱菸及加味菸。知識核心已散落四處，請於迷宮中找出上述四項新世代的健康殺手！',
    cores: ['傳統紙菸', '電子煙', '加熱菸', '加味菸'],
  },
  {
    mission: DetectiveQuizCategory.慢性病防治,
    question:
      '預防代謝症候群五大絕招為：健康吃、做檢查、動起來、不菸酒、壓力去。\n知識核心已散落四處，請於迷宮中找出上述五大絕招！',
    cores: ['健康吃', '做檢查', '動起來', '不菸酒', '壓力去'],
  },
  {
    mission: DetectiveQuizCategory.心理衛生,
    question:
      '自殺防治新口訣為：看、聽、轉、牽、走。\n知識核心已散落四處，請於迷宮中找出上述五口訣！',
    cores: ['看', '聽', '轉', '牽', '走'],
  },
  {
    mission: DetectiveQuizCategory.毒品危害防制,
    question:
      '提供藥癮者就業服務、醫療戒癮轉介、毒品危害諮詢及藥癮者/家屬情緒支持，為毒品危害防制中心諮詢專線的主要功能。\n知識核心已散落四處，請於迷宮中找出上述四項業務！',
    cores: [
      '提供藥癮者就業服務',
      '醫療戒癮轉介',
      '毒品危害諮詢',
      '藥癮者/家屬情緒支持',
    ],
  },
  {
    mission: DetectiveQuizCategory.病人安全,
    question:
      '就醫安全及注意事項需注意病人安全用藥規定、器官捐贈規定、安全通報事件相關規定。\n知識核心已散落四處，請於迷宮中找出上述三項注意事項！',
    cores: ['病人安全用藥規定', '器官捐贈規定', '安全通報事件相關規定'],
  },
  {
    mission: DetectiveQuizCategory.合理就醫,
    question:
      '開立轉診單、保留一定名額給轉診病人、特約院所設立轉診櫃台為醫療院所配合轉診制度的三大重點。\n知識核心已散落四處，請於迷宮中找出上述三大重點！',
    cores: ['開立轉診單', '保留一定名額給轉診病人', '特約院所設立轉診櫃台'],
  },
  {
    mission: DetectiveQuizCategory.緊急救護,
    question:
      '簡易版心肺復甦術步驟為：確認意識、呼叫救護車及AED、按壓胸口及使用AED。\n知識核心已散落四處，請於迷宮中找出簡易版心肺復甦術步驟！',
    cores: ['確認意識', '呼叫救護車及AED', '按壓胸口', '使用AED'],
  },
  {
    mission: DetectiveQuizCategory.長期照顧,
    question:
      '65歲以上失能老人、失能之身心障礙者、55歲以上原住民及50歲以上失智症者，皆為長照2.0服務適用之對象。\n知識核心已散落四處，請於迷宮中找出長照2.0服務適用之對象！',
    cores: [
      '65歲以上失能老人',
      '失能之身心障礙者',
      '55歲以上原住民',
      '50歲以上失智症者',
    ],
  },
  {
    mission: DetectiveQuizCategory.食品安全,
    question:
      '食品製作環境衛生包含：人員衛生、環境清潔及食材保存溫度。\n知識核心已散落四處，請於迷宮中找出上述三項核心！',
    cores: ['人員衛生', '環境清潔', '食材保存溫度'],
  },
  {
    mission: DetectiveQuizCategory.藥物安全,
    question:
      '想要成為用藥安全小尖兵，必須注意藥物許可證、保存期限及合法來源。\n知識核心已散落四處，請於迷宮中找出上述三項注意事項，一起成為用藥安全小尖兵吧！',
    cores: ['藥物許可證', '保存期限', '合法來源'],
  },
  {
    mission: DetectiveQuizCategory.化粧品安全,
    question:
      '化粧品安全知識與法規必須了解：安全使用、辨識正確用途及瞭解規定。\n知識核心已散落四處，請於迷宮中找出所有的核心！',
    cores: ['安全使用', '辨識正確用途', '瞭解規定'],
  },
  {
    mission: DetectiveQuizCategory.傳染病防治,
    question:
      'COVID-19疫苗三大種類可分為：腺病毒載體、Mrna及次蛋白。\n知識核心已散落四處，請於迷宮中找出上述三種COVID-19疫苗！',
    cores: ['腺病毒載體', 'Mrna', '次蛋白'],
  },
  {
    mission: DetectiveQuizCategory.健康促進,
    question:
      '學童護眼六步驟，除了避免幼兒看螢幕超過1小時以上，還有：用眼30分鐘，休息10分鐘、均衡飲食，天天五蔬果、每年定期1-2次檢查視力及每日戶外活動2-3小時以上。\n知識核心已散落四處，請於迷宮中找出下的五步驟吧！',
    cores: [
      '用眼30分鐘，休息10分鐘',
      '均衡飲食，天天五蔬果',
      '每年定期1-2次檢查視力',
      '每日戶外活動2-3小時以上',
      '用眼的距離35公分至45公分左右',
    ],
  },
  {
    mission: DetectiveQuizCategory.動健康,
    question:
      '教育部體育署推動7333規律運動，包含了：運動強度達到流汗也會喘的程度、每週至少運動3次、每次運動至少30分鐘及每次運動心跳達到每分鐘130下。\n知識核心已散落四處，請於迷宮中找出7333規律運動所代表的涵義吧！',
    cores: [
      '運動強度達到流汗也會喘的程度',
      '每週至少運動3次',
      '每次運動至少30分鐘',
      '每次運動心跳達到每分鐘130下',
    ],
  },
  {
    mission: '綜合題型',
    question: '綜合題型',
    cores: ['核心1', '核心2', '核心3', '核心4'],
  },
];
