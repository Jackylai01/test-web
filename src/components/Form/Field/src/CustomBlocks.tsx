import CustomPage from '@components/CustomPage';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { CustomPageBlock } from '@models/entities/custom-page-template';
import { ModuleFolderId } from '@models/requests/archive.req';
import {
  setCustomPageActive,
  setPageBlocks,
} from '@reducers/admin/custom-page';
import { setFileSelectFolderId } from '@reducers/file-select';
import { useEffect, useRef } from 'react';
import { InnerProps } from '..';

const CustomBlocks = ({
  watch,
  setValue,
  fieldConfig: { name, label, required, col, moduleName },
}: InnerProps) => {
  const dispatch = useAppDispatch();
  const current = watch(name);

  const { active, pageBlocks } = useAppSelector((store) => store.customPage);

  const block = useRef<HTMLElement>(null);
  // console.log(block.current?.innerText);
  const saveButton = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!moduleName) return;
    dispatch(setFileSelectFolderId(ModuleFolderId[moduleName]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName]);

  useEffect(() => {
    dispatch(setPageBlocks((watch(name) as any) ?? []));
  }, [dispatch, current, watch, name]);

  // 藉由實際按鈕的觸發解決更新問題，掛載地方為畫面儲存送出按鈕與架站器的的側欄選單
  useEffect(() => {
    const currentPageSubmitButton =
      document.querySelector('.container__header');
    const customPageOptionItems: HTMLElement | null = document.querySelector(
      '.custom-page__option-items',
    );
    currentPageSubmitButton?.addEventListener('click', clickSaveButton);
    customPageOptionItems?.addEventListener('mouseenter', clickSaveButton);
    return () => {
      currentPageSubmitButton?.removeEventListener('click', clickSaveButton);
      customPageOptionItems?.removeEventListener('mouseenter', clickSaveButton);
    };
  }, []);

  const clickSaveButton = () => {
    saveButton.current?.click();
  };

  let copySelectedItems: CustomPageBlock[] = JSON.parse(
    JSON.stringify(pageBlocks ?? []),
  );

  const setBlock = () => {
    setValue(name, copySelectedItems);
    setValue('blockText', block.current?.innerText.replace(/(\n|\r|\t)/g, ''));
  };

  return (
    <>
      <section className={`row__col row__col--${col}`}>
        <header className='container__header container__header--children'>
          <h2 className='container__title'>
            {required && '* '}
            {label}
          </h2>
          <section className='container__actions'>
            <span
              className='container__action  container__action--security'
              onClick={() => dispatch(setCustomPageActive(!active))}
            >
              {active ? '取消編輯內容' : '編輯模式'}
            </span>
            <span
              ref={saveButton}
              className='container__action container__action--hidden'
              onClick={() => setBlock()}
            >
              儲存區塊資料
            </span>
          </section>
        </header>
        <main ref={block}>
          <CustomPage
            copySelectedItems={copySelectedItems}
            clickSaveButton={clickSaveButton}
          />
        </main>
      </section>
    </>
  );
};

export default CustomBlocks;
