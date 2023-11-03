import ContainerBoard from '@components/ContainerBoard';
import LoadingLayout from '@components/LoadingLayout';

import { Member } from '@models/entities/school/member';
import { resetClientTeamStatus } from '@reducers/client/team';
import {
  clientTeamSchoolTeamAsync,
  clientTeamTeamCreateAsync,
  clientTeamTeamListClassAsync,
  clientTeamTeamListStudentAsync,
  clientTeamTeamListTeacherAsync,
} from '@reducers/client/team/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';
import useOutsideTrigger from 'src/hook/useOutsideTrigger';

const CompetitionTeamDetailPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const { id } = router.query as { id: string };
  const isCreate = id === 'create';

  useAuthTeacher();

  const {
    schoolTeam,
    existingMembers,
    teamListClass,
    teamListTeacher,
    teamListStudent,
    status: {
      teamCreateSuccess,
      schoolTeamLoading,
      teamListClassLoading,
      teamListStudentLoading,
      teamListTeacherLoading,
      teamCreateLoading,
    },
  } = useAppSelector((state) => state.clientTeam);

  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  const {
    ref: refTeacher,
    isOutsideTrigger: isOutsideTriggerTeacher,
    setIsOutsideTrigger: setIsOutsideTriggerTeacher,
  } = useOutsideTrigger(false);

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!schoolCode) return;
    schoolTeam || dispatch(clientTeamSchoolTeamAsync(schoolCode));
    dispatch(clientTeamTeamListClassAsync(schoolCode));
    dispatch(clientTeamTeamListTeacherAsync(schoolCode));
  }, [dispatch, schoolCode, schoolTeam]);

  useEffect(() => {
    if (!isCreate || !schoolTeam || schoolTeam.mainTeacherName) return;
    router.push('/competition/main-contact-teacher');
  }, [isCreate, router, schoolTeam]);

  useEffect(() => {
    const defaultValue = schoolTeam?.teams.find((team) => team._id === id);
    if (!defaultValue) return;
    reset(defaultValue);
    setMembers(defaultValue.members);
  }, [id, reset, schoolTeam?.teams]);

  useEffect(() => {
    if (teamCreateSuccess) {
      router.push('/competition/team');
      dispatch(resetClientTeamStatus());
    }
  }, [dispatch, router, teamCreateSuccess]);

  const addStudent = () => {
    const student = (teamListStudent as Member[])[watch('selectedStudent')];
    if (!student) return;
    const isExisting = members.some((item) => item.id === student.id);
    if (members.length >= 4 || isExisting) return;
    setMembers([...members, student]);
  };

  const onSubmit = (data: any) => {
    const newData = {
      schoolCode: schoolCode as string,
      data: { ...data, members: members },
    };
    dispatch(clientTeamTeamCreateAsync(newData));
  };

  return (
    <LoadingLayout
      isLoading={
        schoolTeamLoading ||
        teamListClassLoading ||
        teamListTeacherLoading ||
        teamCreateLoading
      }
    >
      <article className='main__container'>
        <ContainerBoard contentClassName='team-create'>
          <Link href='/competition/team' className='btn margin-bottom'>
            返回隊伍列表管理
          </Link>

          <form className='team-form' onSubmit={handleSubmit(onSubmit)}>
            <section className='team-form__field'>
              <label htmlFor='name'>隊伍名稱</label>
              <input
                type='text'
                id='name'
                placeholder='請輸入隊伍名稱'
                {...register('name', {
                  required: true,
                })}
              />
            </section>

            <section className='team-form__field'>
              <label htmlFor='teacher'>指導老師</label>
              <article
                ref={refTeacher}
                className={`team-form__select ${
                  isOutsideTriggerTeacher ? 'active' : ''
                }`}
              >
                <input
                  type='hidden'
                  {...register('teacher', {
                    required: true,
                  })}
                />
                <span
                  onClick={() =>
                    setIsOutsideTriggerTeacher(!isOutsideTriggerTeacher)
                  }
                >
                  {watch('teacher')
                    ? watch('teacher').name +
                      `${
                        watch('teacher').account
                          ? ` - ${watch('teacher').account}`
                          : ''
                      }`
                    : '請選擇指導老師'}
                </span>
                <ul>
                  <li>
                    <input
                      id='searchKeyword'
                      placeholder='請輸入關鍵字後挑選一位老師'
                      {...register('searchKeyword')}
                    />
                  </li>
                  {teamListTeacher
                    ?.filter(
                      ({ name, account }) =>
                        name.includes(watch('searchKeyword')) ||
                        account.includes(watch('searchKeyword')),
                    )
                    .map((teacher) => (
                      <li
                        key={teacher.id}
                        onClick={() => {
                          setValue('teacher', teacher);
                          setIsOutsideTriggerTeacher(false);
                        }}
                      >
                        {teacher.name}
                        {teacher.account ? ` - ${teacher.account}` : ''}
                      </li>
                    ))}
                </ul>
              </article>
            </section>

            <section className='team-form__field'>
              <label>選擇班級別</label>
              <select
                onChange={(e) =>
                  e.target.value.trim() &&
                  dispatch(
                    clientTeamTeamListStudentAsync({
                      schoolCode: schoolCode as string,
                      classId: e.target.value,
                    }),
                  )
                }
              >
                <option value=''>
                  {teamListClass?.length ? '請選擇' : '請選擇班級'}
                </option>
                {teamListClass?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </section>

            <section className='team-form__field'>
              <label htmlFor='members'>參賽學生</label>
              <article className='team-form__select-create'>
                <select
                  id='student'
                  {...register('selectedStudent')}
                  defaultValue=''
                >
                  <option value='' disabled>
                    {teamListStudentLoading ? '搜尋中請稍候選擇' : '請選擇'}
                  </option>
                  {teamListStudent?.map((item, index) => {
                    const noAccount = !item.account;
                    const existing = existingMembers?.includes(item.id);

                    return (
                      <option
                        key={index}
                        value={index}
                        disabled={noAccount || existing}
                      >
                        {item.seatNo} - {item.name}{' '}
                        {noAccount ? '[無帳號]' : ''}
                        {existing ? '[已報隊]' : ''}
                      </option>
                    );
                  })}
                </select>

                <button className='btn' type='button' onClick={addStudent}>
                  新增學生
                </button>
              </article>
            </section>
            <section>
              {members.length ? (
                <ul className='team-list'>
                  {members.map(({ id, account, className, name, seatNo }) => (
                    <li
                      key={id}
                      className={
                        account && !existingMembers?.includes(id)
                          ? ''
                          : 'active'
                      }
                    >
                      <span>班級：{className} </span>
                      <span></span>
                      <span>
                        姓名：{name} 座號：{seatNo}
                      </span>
                      <span>
                        <a
                          className='btn btn--danger'
                          onClick={() =>
                            setMembers(members.filter((item) => item.id !== id))
                          }
                        >
                          刪除
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className='team-list team-list--no-container'>
                  暫無內容
                </span>
              )}
            </section>
            <button
              type='submit'
              className={`btn btn--create margin-top ${
                members.length >= 3 && members.length <= 4 ? '' : ''
              }`}
            >
              確定送出
            </button>
          </form>
        </ContainerBoard>
      </article>
    </LoadingLayout>
  );
};

export default CompetitionTeamDetailPage;
