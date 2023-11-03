import ContainerBoard from '@components/ContainerBoard';
import Form from '@components/Form';
import LoadingLayout from '@components/LoadingLayout';
import { isDebug } from '@fixtures/constants';
import { createRoomFieldConfigs } from '@fixtures/form-configs/create-room';
import { fieldSetOptions } from '@helpers/field-set-default';

import { resetClientGameFinalGame } from '@reducers/client/game';
import {
  clientGamTeamListAsync,
  clientGameInitFinalGameAsync,
} from '@reducers/client/game/actions';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const CompetitionTeamCreateRoomPage: NextPage = () => {
  const dispatch = useAppDispatch();

  // useAuthTeacher();

  const {
    teamList,
    finalGame,
    status: { teamListLoading, initFinalGameLoading },
    error: { initFinalGameError },
  } = useAppSelector((state) => state.clientGame);
  const { schoolCode } = useAppSelector((state) => state.clientAuth);

  const [formConfigs, setFormConfigs] = useState(createRoomFieldConfigs);

  useEffect(() => {
    if (teamListLoading) return;
    dispatch(clientGamTeamListAsync(schoolCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolCode]);

  useEffect(() => {
    if (!teamList) return;
    const copyConfigs = [...formConfigs];

    fieldSetOptions(
      copyConfigs,
      'leftTeamId',
      teamList.map((team) => team._id),
      teamList.map((team) => team.name),
    );
    fieldSetOptions(
      copyConfigs,
      'rightTeamId',
      teamList.map((team) => team._id),
      teamList.map((team) => team.name),
    );

    setFormConfigs(copyConfigs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamList]);

  const onSubmit = (data: any) => {
    if (isDebug) {
      data = {
        leftTeamId: '644005c7135dad5113f51b8a',
        rightTeamId: '64400626135dad5113f51c09',
      };
    }
    dispatch(clientGameInitFinalGameAsync(data));
  };

  return (
    <article className='main__container '>
      <ContainerBoard contentClassName='room'>
        <Link href='/competition/team' className='btn margin-bottom'>
          返回隊伍列表管理
        </Link>
        <LoadingLayout isLoading={teamListLoading || initFinalGameLoading}>
          {initFinalGameError && (
            <p className='form__error-message'>{initFinalGameError}</p>
          )}
          {finalGame ? (
            <>
              <h2 className='text-center'>房號：{finalGame.code}</h2>
              <section className='margin-top text-center'>
                <a
                  className='btn'
                  onClick={() => dispatch(resetClientGameFinalGame())}
                >
                  重建房間
                </a>
              </section>
            </>
          ) : (
            <Form fieldConfigs={formConfigs} onSubmit={onSubmit}>
              <button type='submit' className='btn margin-top'>
                確定送出
              </button>
            </Form>
          )}
        </LoadingLayout>
      </ContainerBoard>
    </article>
  );
};

export default CompetitionTeamCreateRoomPage;
