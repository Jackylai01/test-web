import Modal from '@components/Modal';
import { CRUDConfig } from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCrudLayoutStatus } from '@reducers/crud-layout';
import {
  crudLayoutDeleteAsync,
  crudLayoutListAsync,
} from '@reducers/crud-layout/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TableLayoutUI from './TableLayoutUI';

type Props = {
  moduleName: string;
  config: CRUDConfig;
};

const TableLayout = ({
  moduleName,
  config: {
    title,
    apiModuleName,
    actions,
    listExtraActions,
    tableExtraActions,
    tableConfigs,
  },
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { query } = router;

  const [deleteData, setDeleteData] = useState<{ _id: string }>();

  const {
    list: listData,
    status: { deleteSuccess, listLoading, deleteLoading },
    error: { deleteError },
  } = useAppSelector((state) => state.crudLayout);

  useEffect(() => {
    if (!router.isReady || listLoading) return;
    dispatch(crudLayoutListAsync({ apiModuleName, query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, apiModuleName, router.isReady]);

  useEffect(() => {
    if (!deleteSuccess) return;
    dispatch(crudLayoutListAsync({ apiModuleName, query }));
    dispatch(resetCrudLayoutStatus());
    setDeleteData(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess]);

  const deleteAction = () => {
    dispatch(
      crudLayoutDeleteAsync({ apiModuleName, id: `${deleteData?._id}` }),
    );
  };

  return (
    <>
      <TableLayoutUI
        title={title}
        listData={listData}
        tableConfigs={tableConfigs}
        isLoading={listLoading || deleteLoading}
        actions={
          <>
            {listExtraActions?.map(({ label, color, href, onClick }) =>
              href ? (
                <Link key={label} href={href}>
                  <a
                    className={`container__action container__action--${color}`}
                  >
                    {label}
                  </a>
                </Link>
              ) : (
                <button
                  key={label}
                  className={`container__action${
                    color ? `container__action--${color}` : ''
                  }`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ),
            )}
            {actions?.includes('create') && (
              <Link href={`${moduleName}/create`}>
                <a className='container__action'>新增項目</a>
              </Link>
            )}
          </>
        }
        tableActions={(item) => (
          <>
            {actions?.includes('delete') && (
              <a
                className='simple-btn simple-btn--danger'
                onClick={() => setDeleteData(item)}
              >
                刪除
              </a>
            )}
            {actions?.includes('update') && (
              <Link href={`${moduleName}/${item._id}`}>
                <a className='simple-btn'>編輯</a>
              </Link>
            )}
            {tableExtraActions?.map(({ label, href, onClick }) =>
              href ? (
                <Link key={label} href={`${moduleName}/${item._id}/${href}`}>
                  <a className='simple-btn'>{label}</a>
                </Link>
              ) : (
                <a key={label} className='simple-btn' onClick={onClick}>
                  {label}
                </a>
              ),
            )}
          </>
        )}
      />
      <Modal
        title='確認刪除'
        currentValue={deleteData}
        setCurrentValue={setDeleteData}
      >
        <p>{deleteError}</p>
        <button
          className='simple-btn'
          style={{ marginRight: 10 }}
          type='button'
          onClick={() => setDeleteData(undefined)}
        >
          取消
        </button>
        <button
          className='simple-btn simple-btn--danger'
          type='button'
          onClick={deleteAction}
        >
          確定
        </button>
      </Modal>
    </>
  );
};

export default TableLayout;
