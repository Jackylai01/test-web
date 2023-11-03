import { NestedList } from '@models/entities/shared/data';

export const personalCompetitionMethods = [
  '1. 參賽資格：具有新北市親師生平台之會員。',
  '2. 每個帳號每日可遊戲3次，遊戲開放時間為每日6時至22時。',
  '3. 可於遊戲時間依親師生帳號進入遊戲，活動時間暫訂於112年3月1日至6月1日。',
  '4. 玩家可控制１隻角色，並自行選擇挑戰題型。',
  '5. 題目類型包含食品安全、健康促進、菸害防制、傳染病防治、慢性病防治、合理就醫、病人安全、化粧品安全、心理衛生、緊急救護、動健康、毒品危害防制、長期照顧、藥物安全，共14大類。',
  '6. 每類題型皆有3個關卡，須完成上一關卡方會開啟下一關，隨著關卡難度增加，闖關時間也將隨之縮短',
  '7. 進入遊戲後會隨機生成迷宮，並出現關卡主要任務（蒐集知識核心），玩家需找出在時間內探索地圖找出目標物。',
  '8. 遊戲中玩家踩到陷阱或要取得道具前會觸發答題，答對即可閃躲陷阱或取得道具，如在五秒內答對陷阱之題目，可獲得額外的遊戲時間；答錯則會陷入混亂３秒，且道具會隨機移動至他處。',
];

export const CampusCompetitionPreliminaryRound: NestedList = [
  {
    label:
      '1. 參賽資格：就讀本市國小之學生，3人一組（可多報名一位備選選手），同校組隊競賽，可跨班、跨年級。',
  },
  { label: '2. 遊戲時間暫訂於111年3月1日開始。' },
  {
    label: '3. 遊戲說明：',
    child: [
      {
        label:
          '1. 由３位玩家組隊，每人可控制１隻角色（角色不可重複），題型為綜合題型。',
      },
      {
        label:
          '2. 進入遊戲後會隨機生成迷宮，並出現關卡主要任務（蒐集知識核心），３位玩家可控制各自角色在迷宮中探索，並在10分鐘內找出目標物。',
      },
      {
        label:
          '3. 遊戲中玩家踩到陷阱或要取得道具前會觸發答題，無時間限制，答對即可閃躲陷阱或取得道具，如在五秒內答對陷阱之題目，可獲得額外的遊戲時間；答錯則會陷入混亂３秒，且道具會隨機移動至他處。',
      },
      {
        label:
          '4. 在地圖中增加遊蕩者，玩家與遊蕩者接觸時將進入答題，20秒內需答對題目三次即可擊敗遊蕩者，並額外增加20秒遊戲時間，如失敗則該玩家會被攻擊；20秒內未達完題目則遊蕩者逃跑，玩家須原地暫停5秒。',
      },
      {
        label: '5. 如玩家血量歸0則會陷入昏迷，此局遊戲將無法操控。',
      },
      {
        label: '6. 分數計算方式：',
        child: [
          {
            label:
              '1. 挑戰成功：於時間內完成主要任務，任１名玩家找到時光機後即可通關。剩餘時間將直接列為分數統計。',
          },
          {
            label:
              '2. 挑戰失敗：全體隊員血量歸０或遊戲時間倒數結束將視為挑戰失敗結束遊戲。該局遊戲將無分數統計。',
          },
          {
            label:
              '3. 如：遊戲結束時剩餘時間列入積分計算，如第一局遊戲結束後剩餘５分 24秒；第二局遊戲結束剩餘 4分07秒；第三局挑戰失敗，則總積分為 9分31秒，以此類推。',
          },
        ],
      },
    ],
  },
  {
    label: '4. 競賽規則：',
    child: [
      {
        label:
          '(1) 每隊共有40次遊戲次數，無每日遊戲次數限制，請於初賽時間內完成遊戲累計積分。題型為是非或選擇題。',
      },
      {
        label:
          '(2) 參與遊戲之3名隊員，須建立遊戲大廳，待人數到齊，始可進入遊戲。',
      },
      {
        label:
          '(3) 每次進入遊戲選角時，可根據戰術運用選擇不同角色攻擊，每個角色技能有所差異。',
      },
      {
        label: '(4) 如隊伍同分狀況，將以隊伍答題正確率作為進入決賽之憑據。',
      },
    ],
  },
];

export const CampusCompetitionFinal: NestedList = [
  {
    label: '1. 錄取資格：',
    child: [
      {
        label:
          '(1) 九大分區：本市九大分區，每分區依校園競賽-初賽積分取前2名，共18名。',
      },
      {
        label:
          '(2) 不分區：不分區排行榜中前2名高分者（扣除已晉級之九大分區前2名），共2名。',
      },
      {
        label:
          '(3) 若因故無法參賽，將由該分項積分第3名學校遞補參賽(分數統計區間為112年3月1日至112年4月28日止，依實際公布競賽規則為準)，如各分區有從缺情形發生，將由不分區排名積分最高隊伍依序遞補。',
      },
    ],
  },
  { label: '2. 競賽日期：暫訂於112年5月27日或 5月28日。' },
  { label: '3. 遊戲說明：於決賽領隊會議上公布。' },
];