import ContainerBoard from '@components/ContainerBoard';
import LoadingLayout from '@components/LoadingLayout';
import { formatDisplayChineseDate } from '@helpers/date';

import { clientGameGameInfoAsync } from '@reducers/client/game/actions';
import {
  clientTeamSchoolTeamAsync,
  clientTeamTeamRemoveAsync,
} from '@reducers/client/team/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';

const CompetitionTeamListPage: NextPage = () => {
  const dispatch = useAppDispatch();

  useAuthTeacher();

  const {
    schoolTeam,
    status: { schoolTeamLoading, teamRemoveLoading },
  } = useAppSelector((state) => state.clientTeam);

  const {
    gameInfo,
    status: { gameInfoLoading },
  } = useAppSelector((state) => state.clientGame);
  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (!schoolCode) return;
    dispatch(clientGameGameInfoAsync());
    dispatch(clientTeamSchoolTeamAsync(schoolCode));
  }, [dispatch, schoolCode]);

  const removeTeam = (id: string) => {
    if (!schoolCode) return;
    dispatch(clientTeamTeamRemoveAsync({ schoolCode, teamId: id }));
  };

  return (
    <LoadingLayout
      isLoading={gameInfoLoading || schoolTeamLoading || teamRemoveLoading}
    >
      <article>
        <ContainerBoard contentClassName='team'>
          <ul className='links-container'>
            <Link href='/competition/school' className='btn margin-bottom'>
              切換學校
            </Link>
            <Link
              href='/competition/main-contact-teacher'
              className='btn margin-left margin-bottom'
            >
              {schoolTeam?.mainTeacherName ? '修改' : '新增'}主要聯絡老師
            </Link>
            {/* <Link
              href='/competition/create-room'
              className='btn margin-left margin-bottom'
            >
              建立房間
            </Link> */}
          </ul>

          <ul className='team-info'>
            <li>學校名稱：{schoolTeam?.schoolName}</li>
            <li>
              目前報名隊伍：{schoolTeam?.teams?.length} 組 (最多
              {schoolTeam?.allowedTotalTeams} 組)
            </li>
            <li>
              開始報名日期：
              {schoolTeam?.registerStartDate &&
                formatDisplayChineseDate(schoolTeam.registerStartDate)}
            </li>
            <li>
              結束報名日期：
              {schoolTeam?.registerEndDate &&
                formatDisplayChineseDate(schoolTeam.registerEndDate)}
              <span>報名日期結束後將不得隨意修改隊伍成員。</span>
            </li>
            報名日期結束後，如欲修改隊伍成員請洽主辦單位。
          </ul>
          <p className='margin-top margin-bottom text-accent'>
            隊伍資訊：就讀貴校之學生，3人一組，可跨班、跨年級組隊競賽。
          </p>
          <ul className='team-list'>
            <li className='team-list__header'>
              <span>隊伍名稱</span>
              <span>指導老師</span>
              <span>
                隊伍成員
                <section className='team-list__actions'>
                  {gameInfo?.isRegisterAvailable &&
                    (schoolTeam?.allowedTotalTeams || 0) >
                      (schoolTeam?.teams.length || 0) && (
                      <Link
                        href='/competition/team/create'
                        className='btn btn--create'
                      >
                        新增
                      </Link>
                    )}
                </section>
              </span>
            </li>
            {schoolTeam?.teams.map((team) => (
              <li key={team._id}>
                <span>{team.name}</span>
                <span>{team.teacher.name}</span>
                <span className='team-caption'>
                  {team.members
                    .map((member) => `${member.className}班 ${member.name}`)
                    .join('、')}

                  {gameInfo?.isRegisterAvailable && (
                    <section className='team-list__actions'>
                      <a
                        className='btn btn--danger'
                        onClick={() => removeTeam(team._id as string)}
                      >
                        刪除
                      </a>
                      <Link
                        href={`/competition/team/${team._id}`}
                        className='btn'
                      >
                        修改
                      </Link>
                    </section>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href='/competition/team/list'
            className='btn btn--full margin-top'
          >
            隊伍遊戲紀錄
          </Link>
        </ContainerBoard>
      </article>
    </LoadingLayout>
  );
};

export default CompetitionTeamListPage;
