import ContainerBoard from '@components/ContainerBoard';
import GameModal from '@components/Game/GameModal';
import LoadingLayout from '@components/LoadingLayout';

import { clientGameFinishAllStagesAsync } from '@reducers/client/game/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const CompetitionGameHeartPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    gameInfo,
    finishAllStageResult,
    status: { gameInfoLoading, finishAllStageLoading, finishAllStageSuccess },
  } = useAppSelector((state) => state.clientGame);

  const onFinished = () => {
    if (!gameInfo?.isReadyToFinish) return;
    dispatch(clientGameFinishAllStagesAsync());
  };

  return (
    <LoadingLayout isLoading={gameInfoLoading || finishAllStageLoading}>
      <main className='game-main game-main--linear-background'>
        <article className='game-main__container game-main__container--border game-main__container--border-heart-bg'>
          <section className='heart-main'>
            <Link className='btn btn--border' href='/competition/game'>
              上一頁
            </Link>

            <article className='heart-main__heart-machine'>活動已結束</article>
            {/* <article className='heart-main__heart-machine'>
              <Image
                src={imgFixButton}
                alt='修復按鈕'
                style={{
                  filter: gameInfo?.isReadyToFinish
                    ? 'unset'
                    : 'grayscale(80%)',
                }}
                onClick={onFinished}
              />

              <ul className='heart-main__heart-shard'>
                <li>
                  <Image src={imgEmptyHeart} alt='空愛心' className='' />
                </li>
                {gameInfo?.detectiveStagesProgress.map(
                  ({ category, process }, index) => (
                    <li key={category}>
                      {process.length === 3 ? (
                        <Image
                          src={heartShardImageList[index]}
                          alt='愛心碎片'
                        />
                      ) : (
                        <></>
                      )}
                    </li>
                  ),
                )}
                <li>
                  <Image src={imgLightning} alt='閃電' />
                </li>
              </ul>

              <Image
                src={imgHeartMachine}
                alt='機器'
                className='heart-main__machine-img'
              />
            </article> */}
          </section>
        </article>
      </main>

      <GameModal isOpen={finishAllStageSuccess}>
        <div style={{ margin: '10%' }}>
          <ContainerBoard title='修復健康之心'>
            {finishAllStageResult?.isValid
              ? '修復成功'
              : finishAllStageResult?.message}
            <br />
            <Link className='btn margin-top' href='/competition/game'>
              返回
            </Link>
          </ContainerBoard>
        </div>
      </GameModal>
    </LoadingLayout>
  );
};

export default CompetitionGameHeartPage;
