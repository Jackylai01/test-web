/* eslint-disable @next/next/no-img-element */
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageBlock } from '@models/entities/custom-page-template';
import {
  formLayoutDataReset,
  removeBLockItem,
  setDragItem,
  setPageBlocks,
} from '@reducers/admin/custom-page';
import React, { useEffect } from 'react';
import NestedDisplayUI from './NestedDisplayUI';

type Props = {
  copySelectedItems: CustomPageBlock[];
  clickSaveButton: Function;
};

const CustomPage = ({ copySelectedItems, clickSaveButton }: Props) => {
  const dispatch = useAppDispatch();

  const { active, dragItem, pageBlocks } = useAppSelector(
    (store) => store.customPage,
  );

  useEffect(() => {
    return () => {
      dispatch(formLayoutDataReset());
    };
  }, [dispatch]);

  const handleDrop = (e: React.DragEvent, index?: number) => {
    e.stopPropagation();
    e.preventDefault();
    if (!dragItem?.block) return;

    // insert
    if (index !== undefined) {
      const newSelectedItems = [...pageBlocks];
      if (dragItem.index !== undefined) {
        newSelectedItems.splice(dragItem.index, 1);
      }
      newSelectedItems.splice(index, 0, dragItem.block);
      dispatch(setPageBlocks(newSelectedItems));
      // new
    } else if (dragItem.index === undefined) {
      dispatch(setPageBlocks([...pageBlocks, dragItem.block]));
    }

    setDragItem(null);
  };

  const deleteBlock = (blockIndex: number) => {
    dispatch(removeBLockItem(blockIndex));
  };

  const moveBlock = (blockIndex: number, moveValue: number) => {
    const moveTarget = blockIndex + moveValue;

    if (moveTarget < 0 || moveTarget > pageBlocks.length - 1) return;

    const copyBlocks = JSON.parse(JSON.stringify(pageBlocks));
    copyBlocks.splice(moveTarget, 0, copyBlocks.splice(blockIndex, 1)[0]);

    dispatch(setPageBlocks(copyBlocks));
  };

  return (
    <article
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      className='custom-page'
    >
      <section className='custom-page__selected-items'>
        <ul className='custom-block'>
          {copySelectedItems.length ? (
            copySelectedItems.map((item, index) => (
              <li key={index} onDrop={(e) => handleDrop(e, index)}>
                <article className={item.className}>
                  <NestedDisplayUI elements={item.elements} isEdit={active} />
                </article>
                {active && (
                  <div
                    className='custom-page__action-box'
                    onMouseEnter={() => clickSaveButton()}
                  >
                    <span
                      onClick={() => deleteBlock(index)}
                      className='icomoon-bin'
                    ></span>

                    <span
                      draggable={active}
                      onDragStart={() => {
                        dispatch(setDragItem({ block: item, index: index }));
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <svg
                        id='open-with-outlined-24px'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path d='M10,9h4V6h3L12,1,7,6h3ZM9,10H6V7L1,12l5,5V14H9Zm14,2L18,7v3H15v4h3v3Zm-9,3H10v3H7l5,5,5-5H14Z' />
                      </svg>
                    </span>
                    <span
                      onClick={() => moveBlock(index, -1)}
                      className='icomoon-arrow-dropdown'
                      style={{ transform: 'rotate(180deg)' }}
                    ></span>
                    <span
                      onClick={() => moveBlock(index, 1)}
                      className='icomoon-arrow-dropdown'
                    ></span>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className='custom-block__empty'>請拉入內容</li>
          )}
        </ul>
      </section>
    </article>
  );
};

export default CustomPage;
