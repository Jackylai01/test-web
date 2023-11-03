import ContainerBoard from '@components/ContainerBoard';
import LoadingLayout from '@components/LoadingLayout';

import {
  clientTeamRemoveGameAsync,
  clientTeamTeamListAsync,
} from '@reducers/client/team/actions';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';

const CompetitionTeamRecordListPage: NextPage = () => {
  const dispatch = useAppDispatch();

  useAuthTeacher();

  const {
    teamList,
    status: { teamListLoading, teamRemoveGameLoading },
  } = useAppSelector((state) => state.clientTeam);
  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (!schoolCode) return;
    dispatch(clientTeamTeamListAsync(schoolCode));
  }, [dispatch, schoolCode]);

  useEffect(() => {
    if (!schoolCode) return;
    if (teamRemoveGameLoading) return;
    dispatch(clientTeamTeamListAsync(schoolCode));
  }, [dispatch, teamRemoveGameLoading, schoolCode]);

  return (
    <LoadingLayout isLoading={teamListLoading || teamRemoveGameLoading}>
      <article className='main__container'>
        <ContainerBoard contentClassName='team-list'>
          <Link href='/competition/team' className='btn margin-bottom'>
            返回隊伍管理
          </Link>
          <ul className='team-record'>
            {teamList?.map((team) => (
              <li key={team._id}>
                <span>隊伍名稱:{team.name}</span>
                <span>指導老師:{team.teacher.name}</span>
                <span>
                  隊伍成員:
                  {team.members
                    .map((member) => `${member.className}班 ${member.name}`)
                    .join('、')}
                </span>
                <span>總剩餘秒數:{team.remainingSeconds}</span>
                <span>遊玩次數:{team.gameCount}</span>
                <span>
                  {team.hasOngoingGame && (
                    <a
                      onClick={() =>
                        team._id
                          ? dispatch(clientTeamRemoveGameAsync(team._id))
                          : null
                      }
                    >
                      結束遊戲
                    </a>
                  )}
                </span>
                <span>
                  <Link href={`/competition/team/${team._id}/record`}>
                    查看紀錄
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </ContainerBoard>
      </article>
    </LoadingLayout>
  );
};

export default CompetitionTeamRecordListPage;
