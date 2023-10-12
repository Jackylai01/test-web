import GameRule from '@public/Images/Multimedia/Game.png';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

const PersonalPage: NextPage = () => {
  const [BackgroundLong, setBackgroundLong] = useState(
    '/Images/Multimedia/個人戰.png',
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
              <p>
                1.參賽資格：具有新北市親師生平台之會員，不限年齡與性別皆可參與。
              </p>
              <p>
                2.活動期間，遊戲次數以回血方式控管
                (每60分鐘累計1次遊戲次數)，累計上限為5次，並每日0時恢復遊戲次數至5次。
              </p>
              <p>
                3.可於遊戲時間依親師生帳號進入遊戲，積分時間暫訂於112年2月1日至5月31日。
              </p>
              <p>4.玩家可控制１隻角色，並自行選擇挑戰題型。</p>
              <p>
                5.題目類型包含食品安全、健康促進、菸害防制、傳染病防治、慢性病防治、合理就醫、病人安全、化粧品安全、心理衛生、緊急救護、動健康、毒品危害防制、長期照顧、藥品安全，共14大類。
              </p>
              <p>
                6.每類題型皆有3個關卡，隨著關卡難度增加，闖關時間也將隨之縮短
              </p>
              <p>
                7.進入遊戲後會隨機生成迷宮，並出現關卡主要任務（蒐集屬性果實），玩家需找出在時間內探索地圖找出目標物。
              </p>
              <p>
                8.遊戲中玩家踩到陷阱或要取得道具前會觸發答題，答對即可閃躲陷阱或取得道具，如在五秒內答對陷阱之題目，可獲得額外的遊戲時間；答錯則會陷入混亂３秒，且道具會隨機移動至他處。
              </p>
              <p>9.各關卡模式請參考下表：  </p>
              <Image src={GameRule} alt='遊戲說明' width='450' height='200' />
              <p>10.比賽結束條件：</p>
              <li>挑戰成功：於時間內蒐集完所有屬性果實。</li>
              <li>挑戰失敗：未能於時間內完成任務。</li>
              <li>
                蒐集任務：每完成一個題型的全部關卡後，可獲得六大食物，蒐集完成後成功組成健康餐盤即可進行【大獎抽抽獎活動】。
              </li>
              <p>
                11.為鼓勵國小學生參賽，特加開國小學生個人賽計分賽，說明請參考下表：
              </p>
              <span>
                <p>競賽日期：113年2月1日至113年4月14日止。</p>
                <p>
                  12.參賽資格：活動期間就讀於新北市國小1至6年級學生，透過親師生平台帳號進行遊戲。
                </p>
                <p>
                  積分加成：
                  <br />
                  <b>簡單：挑戰成功積分乘以1倍</b>
                  <br />
                  <b>中等：挑戰成功積分乘以2倍</b>
                  <br />
                  <b>困難：挑戰成功積分乘以3倍</b>
                </p>
                <p>13.獎項資訊請參考競賽實施計畫。</p>
              </span>
            </section>
          </header>
        </article>
      </main>
    </>
  );
};

export default PersonalPage;
