import { NextPage } from 'next';
import { useState } from 'react';

const FinalsPage: NextPage = () => {
  const [BackgroundLong, setBackgroundLong] = useState(
    '/Images/Multimedia/校園決賽.png',
  );

  return (
    <>
      <main className='multimedia'>
        <article className='multimedia__container'>
          <header
            className='multimedia__container-personal-img'
            style={{ backgroundImage: `url(${BackgroundLong})` }}
          >
            <section className='multimedia__container-personal-img--personal'>
              <p>1.參賽資格：參與初賽並進入決賽之隊伍。</p>
              <p>2.競賽方式：採線上積分賽。</p>
              <p>3.遊戲時間：暫訂於113年5月1日開始。</p>
              <p>4.遊戲說明：</p>
              <li>
                由３位玩家組隊，每人可控制１隻角色（角色不可重複），題型為綜合題型，皆為選擇題。
              </li>
              <li>
                進入遊戲後會隨機生成迷宮，並出現關卡主要任務（蒐集六大屬性果實），３位玩家可控制各自角色在迷宮中探索，並在3分鐘內找出目標物。
              </li>
              <li>
                遊戲中玩家踩到陷阱或要取得道具前會觸發答題，無時間限制，答對即可閃躲陷阱或取得道具，如在五秒內答對陷阱之題目，可獲得額外的遊戲時間；答錯則會陷入混亂３秒，且道具會隨機移動至他處。
              </li>
              <b>
                A.地圖中會有重複的果實，如玩家拾取會有警示文字說明已經拿過了。
              </b>
              <b>B.最後30秒系統將會自動顯示剩餘的果實位置。</b>
              <b>C.地圖上會隨機出現五個技能果實，以豐富遊戲進行。</b>
              <li>
                在地圖中增加遊蕩者，玩家與遊蕩者接觸時將進入答題，20秒內需答對題目三次即可擊敗遊蕩者，並額外增加20秒遊戲時間，如失敗則該玩家會被攻擊；20秒內未達完題目則遊蕩者逃跑，玩家須原地暫停5秒。
              </li>
              <li>如玩家血量歸0則會陷入昏迷，此局遊戲將無法操控。</li>
              <p>5.分數計算方式：</p>
              <li>
                挑戰成功：於時間內完成主要任務，任１名玩家找到營火後即可通關。剩餘時間將直接列為分數統計。
              </li>
              <li>
                挑戰失敗：全體隊員血量歸０或遊戲時間倒數結束將視為挑戰失敗結束遊戲。該局遊戲將無分數統計。
              </li>
              <li>
                如：遊戲結束時剩餘時間列入積分計算，如遊戲結束後尚有５分17秒，獲得371分，以此類推。
              </li>
              <p>6.競賽規則：</p>
              <li>
                競賽期間每隊有20次遊戲機會，可於遊戲開放時間(每日06:00~22:00)進行遊戲，單日遊戲次數不限制。並取前15高積分作為累積。
              </li>
              <li>
                參與遊戲前，指導老師需至隊伍管理開啟遊戲權限(權限開放時間為1小時，1小時候指導老師須再次開啟)，3名隊員登入後，始可開始遊戲。
              </li>
              <li>
                每次進入遊戲選角時，可根據戰術運用選擇不同角色攻擊，每個角色技能有所差異。
              </li>
              <li>
                採不分區積分排名，前5名之隊伍頒發獎金、獎狀及獎盃，詳細說明請參考競賽實施計畫。
              </li>
            </section>
          </header>
        </article>
      </main>
    </>
  );
};

export default FinalsPage;
