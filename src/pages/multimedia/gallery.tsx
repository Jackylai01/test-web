import ContainerBoard from '@components/ContainerBoard';
import { NextPage } from 'next';
import Link from 'next/link';

const galleryLists = [
  {
    title: '【112年新北市健康識能競賽】決賽照片',
    href: 'https://drive.google.com/drive/folders/1bD8DKhJXYnCRIXIhvLxeZLl07VvYy2r9',
  },
  {
    title: '【109年新北市健康識能競賽】決賽照片',
    href: 'https://photos.google.com/share/AF1QipPaeg9KNv-H3lgJslwPAIu96Zh4SN9MS8BLNhRotzC5ZX-kw6tkhj98BQI9Dcn4yg?key=YzVGQmFLMWU3MkQzSzl6NTRObWRlZWE1dDhCRG1B',
  },
];

const GalleryPage: NextPage = () => {
  return (
    <>
      <article className='main__container'>
        <ContainerBoard
          title='活動照片'
          className='container-board'
          contentClassName='multimedia'
          titleClassName='main-title'
        >
          <ul className='line-list__gallery'>
            {galleryLists.map((items) => (
              <li key={items.title}>
                <Link href={items.href}>
                  <a target='_blank' rel='noopener noreferrer'>
                    <h3>{items.title}</h3>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </ContainerBoard>
      </article>
    </>
  );
};

export default GalleryPage;
