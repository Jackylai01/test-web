import FormLayout from '@components/CRUDLayout/FormLayout';
import MessageModal from '@components/Modal/MessageModal';
import crudConfigMap from '@fixtures/crud-configs';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { ProfileResponse } from '@models/responses/user.res';
import { resetAdminAuthStatus } from '@reducers/admin/auth';
import { adminModifyProfileAsync } from '@reducers/admin/auth/actions';
import { setCrudLayoutDetail } from '@reducers/crud-layout';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const AdminUserProfilePage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    userProfile,
    status: {
      modifyProfileFailed,
      modifyProfileLoading,
      modifyProfileSuccess,
      adminDetailUserProfileLoading,
    },
    error: { modifyProfileError },
  } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!userProfile) return;
    dispatch(setCrudLayoutDetail(userProfile));
  }, [dispatch, userProfile]);

  const onSubmit = (data: ProfileResponse) => {
    dispatch(adminModifyProfileAsync(data));
  };

  return (
    <>
      <FormLayout
        moduleName='admin-profile'
        config={crudConfigMap['admin-profile']}
        isLoading={modifyProfileLoading || adminDetailUserProfileLoading}
        customSubmit={onSubmit}
      />
      <MessageModal
        title='儲存'
        active={modifyProfileSuccess || modifyProfileFailed}
        error={modifyProfileError}
        close={() => dispatch(resetAdminAuthStatus())}
      />
    </>
  );
};

export default AdminUserProfilePage;
