import ContainerBoard from '@components/ContainerBoard';

import { setClientAuthSchool } from '@reducers/client/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';
import useAuthTeacher from 'src/hook/useAuthTeacher';

const SchoolPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.clientAuth);

  useAuthTeacher();

  const switchSchool = (schoolCode: string) => {
    dispatch(setClientAuthSchool(schoolCode));
    router.push('/competition/team');
  };

  return (
    <article className='main__container'>
      <ContainerBoard contentClassName='school'>
        <Link href='/competition/team' className='btn margin-bottom'>
          返回隊伍列表管理
        </Link>
        <h2></h2>
        <ul className='team-list'>
          {user?.schools.map(({ schoolCode, schoolName }) => (
            <li key={schoolCode}>
              <span onClick={() => switchSchool(schoolCode)}>{schoolName}</span>
            </li>
          ))}
        </ul>
      </ContainerBoard>
    </article>
  );
};

export default SchoolPage;
