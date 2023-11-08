import ContainerBoard from '@components/ContainerBoard';
import { Activity } from '@models/entities/activity/activity';
import { apiPublicListActivities } from '@services/public/activity/public-activity';
import { ApiPaginationResult } from '@services/shared/api';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

type Props = {
  activityList: ApiPaginationResult<Activity>;
};

const GalleryPage: NextPage<Props> = ({ activityList }) => {
  return (
    <>
      <article className='main__container'>
        <ContainerBoard
          className='container-board'
          contentClassName='multimedia-photo'
          titleClassName='main-title'
        >
          <ul className='line-list__gallery'>
            {activityList?.data.map((activity) => (
              <li key={activity.title}>
                <Link href={activity.link} target='_blank' legacyBehavior>
                  <span rel='noopener noreferrer'>
                    <h3>{activity.title}</h3>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ContainerBoard>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { result: activityList } = await apiPublicListActivities();
  return { props: { activityList } };
};

export default GalleryPage;
