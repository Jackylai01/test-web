import ContainerBoard from '@components/ContainerBoard';
import LoadingLayout from '@components/LoadingLayout';
import Modal from '@components/Modal';
import { formatDisplayChineseDateTime } from '@helpers/date';

import { Quiz } from '@models/entities/record/record';
import { clientTeamRecordListAsync } from '@reducers/client/team/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';

const CompetitionTeamRecordListPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useAuthTeacher();

  const { id } = router.query as { id: string };

  const {
    recordList,
    status: { recordListLoading },
  } = useAppSelector((state) => state.clientTeam);
  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  console.log(recordList);

  const [quizList, setQuizList] = useState<Quiz[]>();

  useEffect(() => {
    if (!schoolCode || !id) return;
    dispatch(clientTeamRecordListAsync({ schoolCode, teamId: id }));
  }, [dispatch, id, schoolCode]);

  return (
    <LoadingLayout isLoading={recordListLoading}>
      <article className='main__container '>
        <ContainerBoard contentClassName='team-detail'>
          <Link href='/competition/team/list' className='btn margin-bottom'>
            返回隊伍遊戲紀錄
          </Link>

          <ul className='team-game'>
            <li className='team-game__header'>
              <span>遊戲時間</span>
              <span>剩餘秒數</span>
              <span>遊戲成員</span>
              <span></span>
            </li>
            {recordList?.map(
              ({
                _id,
                createAt,
                remainingSeconds,
                leftSideUsers,
                quizList,
              }) => (
                <li key={_id}>
                  <span>{formatDisplayChineseDateTime(createAt)}</span>
                  <span>{remainingSeconds}</span>
                  <span>
                    {leftSideUsers?.map(({ _id, name, className }) => (
                      <span key={_id}>
                        {className}班 {name}
                      </span>
                    ))}
                  </span>
                  <span>
                    <a className='remove' onClick={() => setQuizList(quizList)}>
                      查看
                    </a>
                  </span>
                </li>
              ),
            )}
          </ul>
          <Modal currentValue={quizList} setCurrentValue={setQuizList}>
            <article className='quiz-box'>
              <section className='quiz-box__title'>
                <h1>答題紀錄</h1>
              </section>
              <ul className='question-records'>
                {quizList &&
                  quizList
                    .filter((record) => record.leftAnswer)
                    .map((record, index) => (
                      <li key={index}>
                        <h4>{record.question}</h4>
                        <span>
                          選項：
                          {record.options
                            .map((option) => option.option)
                            .join('、')}
                        </span>
                        <span>
                          正解：
                          {
                            record.options.find(
                              (option) => option.no === record.correctAnswer,
                            )?.option
                          }
                        </span>
                        <span
                          style={{
                            color:
                              record.leftAnswer === record.correctAnswer
                                ? 'green'
                                : 'red',
                          }}
                        >
                          回答：
                          {
                            record.options.find(
                              (option) => option.no === record.leftAnswer,
                            )?.option
                          }
                        </span>
                        <span>解說：{record.explanation}</span>
                      </li>
                    ))}
              </ul>
            </article>
          </Modal>
        </ContainerBoard>
      </article>
    </LoadingLayout>
  );
};

export default CompetitionTeamRecordListPage;
