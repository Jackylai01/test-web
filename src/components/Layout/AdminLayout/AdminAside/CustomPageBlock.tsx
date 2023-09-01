/* eslint-disable @next/next/no-img-element */
import { customPageTemplates } from '@fixtures/custom-page-templates';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import { setCustomPageActive, setDragItem } from '@reducers/admin/custom-page';

import { getFileUrl } from '../../../../helpers/archive';

const CustomPageBlock = () => {
  const dispatch = useAppDispatch();

  const { active } = useAppSelector((store) => store.customPage);

  return (
    <main className={`manager-aside__extra-block${active ? ' active' : ''}`}>
      <section className='custom-page__option-items'>
        <ul>
          {customPageTemplates.map((template: CustomPageTemplate) => (
            <li
              key={template._id}
              draggable
              onDragStart={() =>
                dispatch(setDragItem({ block: template.block }))
              }
              onDragOver={(e) => e.preventDefault()}
            >
              <img src={getFileUrl(template.cover)} alt='展示圖片' />
            </li>
          ))}
        </ul>
      </section>
      <span
        className='manager-aside__extra-back-btn'
        onClick={() => dispatch(setCustomPageActive(false))}
      >
        返回全部功能選單
      </span>
    </main>
  );
};

export default CustomPageBlock;
