import ContainerBoard from '@components/ContainerBoard';
import type { NextPage } from 'next';

const ActivityStoryPage: NextPage = () => {
  return (
    <ContainerBoard contentClassName='story'>
      <article className='article'>
        <p>
          在完成修復「健康之心」之後，英雄們回到實驗室，正準備像海爾斯博士彙報任務完成的好消息，
          卻只見滿地的食物屑及包裝袋，不見海爾斯博士和藹的笑容。原來海爾斯博士因累積過多的壓力，
          原本打算透過吃一點小點心來舒緩壓力，卻不慎染上暴飲暴食的壞習慣，身體素質每況愈下，除了肚子越來越大之外，
          對於健康議題也不再關心。其雙胞胎妹妹海爾希(Healthy)因為擔心哥哥的健康狀況，委託英雄們前往傳說中的「夢幻果島」。
        </p>
        <p>
          傳言夢幻果島上有著許多神奇的果實，有的吃了可以看見食物的熱量、有的吃了就會產生拒絕別人的勇氣；
          而只要蒐集滿六大屬性的果實，並搭配得宜，就能夠幫助人們恢復身體健康，改掉壞習慣；而這就是海爾希所委託的任務，
          調配出均衡餐，幫助海爾斯博士重返健康。
        </p>
        <p>
          這次，輪到你來守護海爾斯博士了！帶領著英雄們前往「夢幻果島」，在茂密的叢林中披荊斬棘，踏上不為人知的尋寶之旅，
          蒐集不同屬性果實；運用智慧與技巧閃避路上的重重陷阱，同時學習最新的健康識能，來挑戰守護果實的神祕野獸！
        </p>
      </article>
    </ContainerBoard>
  );
};

export default ActivityStoryPage;
