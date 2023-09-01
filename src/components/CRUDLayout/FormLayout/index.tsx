import { ADMIN_ROUTE } from '@fixtures/constants';
import { CRUDConfig } from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetCrudLayout } from '@reducers/crud-layout';
import {
  crudLayoutCreateAsync,
  crudLayoutDetailAsync,
  crudLayoutUpdateAsync,
} from '@reducers/crud-layout/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FormLayoutUI from './FormLayoutUI';

type Props = {
  moduleName: string;
  id?: string;
  config: CRUDConfig;
  customSubmit?: (data: any) => void;
  children?: React.ReactNode;
  isLoading?: boolean;
};

const FormLayout = ({
  moduleName,
  id,
  config: { title, apiModuleName, actions, detailExtraActions, fieldConfigs },
  customSubmit,
  children,
  isLoading,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isCreate = id === 'create';

  const {
    detail: detailData,
    status: {
      createSuccess,
      updateSuccess,
      detailLoading,
      createLoading,
      updateLoading,
    },
    error: { detailError, createError, updateError },
  } = useAppSelector((state) => state.crudLayout);

  useEffect(() => {
    if (isCreate || !id) return;
    dispatch(crudLayoutDetailAsync({ apiModuleName, id }));
  }, [apiModuleName, dispatch, id, isCreate]);

  useEffect(() => {
    return () => {
      dispatch(resetCrudLayout());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!createSuccess && !updateSuccess) return;
    router.push(`/${ADMIN_ROUTE}/${moduleName}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess, updateSuccess]);

  const onSubmit = (data: any) => {
    if (customSubmit) {
      customSubmit(data);
      return;
    }
    if (isCreate) {
      dispatch(crudLayoutCreateAsync({ apiModuleName, data }));
    } else {
      dispatch(crudLayoutUpdateAsync({ apiModuleName, data }));
    }
  };

  return (
    <FormLayoutUI
      title={title}
      isLoading={detailLoading || createLoading || updateLoading}
      detailData={detailData}
      fieldConfigs={fieldConfigs}
      onSubmit={onSubmit}
      error={detailError || createError || updateError}
      actions={
        <>
          {actions.includes('return') && (
            <Link href={`/${ADMIN_ROUTE}/${moduleName}`}>
              <a className='container__action container__action--security'>
                返回
              </a>
            </Link>
          )}
          {actions.includes('home') && (
            <Link href={`/${ADMIN_ROUTE}`}>
              <a className='container__action container__action--security'>
                返回首頁
              </a>
            </Link>
          )}
          {detailExtraActions?.map(({ label, color, href, onClick }) =>
            href ? (
              <Link key={label} href={href}>
                <a className={`container__action container__action--${color}`}>
                  {label}
                </a>
              </Link>
            ) : (
              <button
                key={label}
                className={`container__action container__action--${color}`}
                onClick={onClick}
              >
                {label}
              </button>
            ),
          )}
          {actions.includes('save') && (
            <button className='container__action' type='submit'>
              儲存檔案
            </button>
          )}
        </>
      }
    >
      {children}
    </FormLayoutUI>
  );
};

export default FormLayout;
