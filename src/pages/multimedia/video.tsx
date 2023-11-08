import ContainerBoard from '@components/ContainerBoard';
import { Video } from '@models/entities/video/video';
import { apiPublicListVideos } from '@services/public/video/public-video';
import { ApiPaginationResult } from '@services/shared/api';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

type Props = {
  videoList: ApiPaginationResult<Video>;
};
const VideoPage: NextPage<Props> = ({ videoList }) => {
  return (
    <>
      <article className='main__container'>
        <ContainerBoard
          className='container-board'
          contentClassName='multimedia-video'
          titleClassName='main-title'
        >
          <ul className='line-list__video'>
            {videoList.data.map((videos) => (
              <li key={videos._id}>
                <Link
                  href={videos.link}
                  target='_blank'
                  passHref
                  legacyBehavior
                >
                  <span rel='noopener noreferrer'>
                    <h3>{videos.title}</h3>
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
  const { result: videoList } = await apiPublicListVideos();
  return { props: { videoList } };
};

export default VideoPage;
