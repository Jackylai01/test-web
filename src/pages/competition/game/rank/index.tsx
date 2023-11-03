import LoadingLayout from '@components/LoadingLayout';

import { clientGameGameRankingAsync } from '@reducers/client/game/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const rankingTypes = ['各校', '分區', '各隊'];

const CompetitionGameRankPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    gameRanking,
    status: { gameRankingLoading },
  } = useAppSelector((state) => state.clientGame);

  const [currentTab, setCurrentTab] = useState('各校');

  const rankingList = useMemo(() => {
    switch (currentTab) {
      case '各校':
        return gameRanking?.schoolRanking;
      case '分區':
        return gameRanking?.areaRanking;
      case '各隊':
        return gameRanking?.teamRanking;
      default:
        return gameRanking?.teamRanking.filter((x) => x.area === currentTab);
    }
  }, [currentTab, gameRanking]);

  useEffect(() => {
    if (gameRankingLoading) return;
    dispatch(clientGameGameRankingAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='game-main game-main--linear-background-cyan'>
      <article className='game-main__container game-main__container--border-mask game-main__container--border-cyan'>
        <section className='rank-main'>
          <aside className='rank-main__aside'>
            <Link className='btn btn--border' href='/competition/game'>
              上一頁
            </Link>
            <ul className='rank-main__buttons'>
              {rankingTypes.map((type) => (
                <li key={type}>
                  <a
                    className={`rank-btn rank-btn--${
                      currentTab === type ? 'dark' : 'light'
                    }`}
                    onClick={() => setCurrentTab(type)}
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <section className='rank-main__container'>
            <article className='rank-main__main'>
              <LoadingLayout isLoading={gameRankingLoading}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-210px',
                      left: '80px',
                      right: '100px',
                      color: 'white',
                      textAlign: 'center',
                      backgroundColor: 'rgba(22, 108, 105, .7)',
                      borderRadius: '5px',
                      fontSize: '0.9em',
                    }}
                  >
                    <p>每隊遊戲次數共55次，只取前40次高分做為積分統計</p>
                    <p>統計時間為校園競賽-初賽</p>
                    <p>開放時間：3/1 06:00 起至 4/28 22:00止</p>
                  </div>
                </div>
                {currentTab === '分區' ? (
                  <div style={{ color: '#166c69', textAlign: 'center' }}>
                    點擊分區名稱可查看各分區隊伍排行
                  </div>
                ) : null}
                <ul className='rank-main__ranks'>
                  <li>
                    <span>名次</span>
                    {(currentTab === '各校' || currentTab === '各隊') && (
                      <span>地區</span>
                    )}
                    {currentTab === '各隊' && <span>學校</span>}
                    <span>
                      {currentTab === '分區'
                        ? '地區'
                        : currentTab === '各校'
                        ? '學校'
                        : '隊名'}
                    </span>
                    <span>
                      {currentTab === '各校' ? '平均剩餘秒數' : '剩餘秒數'}
                    </span>
                  </li>
                  {rankingList?.map((data, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        if (currentTab === '分區') {
                          setCurrentTab(data.name);
                        }
                      }}
                    >
                      <span>{index + 1}</span>
                      {(currentTab === '各校' || currentTab === '各隊') && (
                        <span>{(data as any).area}</span>
                      )}
                      {currentTab === '各隊' && (
                        <span>{(data as any).schoolName}</span>
                      )}
                      {rankingTypes.includes(currentTab) ? (
                        <span>{data.name}</span>
                      ) : (
                        <span>
                          {(data as any).area}-{(data as any).schoolName}-
                          {data.name}
                        </span>
                      )}
                      <span>{data.remainingSeconds}</span>
                    </li>
                  ))}
                </ul>
              </LoadingLayout>
            </article>
          </section>
        </section>
      </article>
    </main>
  );
};

export default CompetitionGameRankPage;
