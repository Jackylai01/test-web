import ContainerBoard from '@components/ContainerBoard';
import Form from '@components/Form';
import LoadingLayout from '@components/LoadingLayout';
import { mainContactTeacherFieldConfigs } from '@fixtures/form-configs/main-contact-teacher';
import { resetClientTeamStatus } from '@reducers/client/team';
import {
  clientTeamSaveMainContactTeacherAsync,
  clientTeamSchoolTeamAsync,
} from '@reducers/client/team/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';

const CompetitionContactPersonPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useAuthTeacher();

  const {
    schoolTeam,
    status: {
      schoolTeamLoading,
      saveMainContactPersonLoading,
      saveMainContactPersonSuccess,
    },
    error: { saveMainContactPersonError },
  } = useAppSelector((state) => state.clientTeam);
  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  useEffect(() => {
    if (!schoolCode) return;
    dispatch(clientTeamSchoolTeamAsync(schoolCode));
  }, [dispatch, schoolCode]);

  useEffect(() => {
    if (!saveMainContactPersonSuccess) return;
    router.push('/competition/team');

    return () => {
      dispatch(resetClientTeamStatus());
    };
  }, [dispatch, router, saveMainContactPersonSuccess]);

  const onSubmit = (data: any) => {
    if (!schoolCode) return;
    dispatch(clientTeamSaveMainContactTeacherAsync({ schoolCode, data }));
  };

  return (
    <article className='main__container'>
      <ContainerBoard contentClassName='teacher'>
        <Link href='/competition/team' className='btn margin-bottom'>
          返回隊伍列表管理
        </Link>
        <LoadingLayout
          isLoading={schoolTeamLoading || saveMainContactPersonLoading}
        >
          <Form
            fieldConfigs={mainContactTeacherFieldConfigs}
            resetData={schoolTeam}
            onSubmit={onSubmit}
          >
            {saveMainContactPersonError && <p>{saveMainContactPersonError}</p>}
            <button type='submit' className='btn margin-top'>
              確定送出
            </button>
          </Form>
        </LoadingLayout>
      </ContainerBoard>
    </article>
  );
};

export default CompetitionContactPersonPage;
