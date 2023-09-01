import { CRUDConfig } from '.';

const adminUserCRUDConfig: CRUDConfig = {
  title: '系統使用者資料',
  apiModuleName: 'admin-users',
  layout: ['table', 'form'],
  actions: ['create', 'update', 'delete', 'return', 'save'],
  tableConfigs: [
    { title: '使用者姓名', key: 'name' },
    { title: '使用者信箱', key: 'email' },
    { title: '手機', key: 'phoneNumber' },
    { title: '最後編輯時間', key: 'modifiedAt', format: 'date' },
  ],
  fieldConfigs: [
    {
      name: '_id',
      type: 'hidden',
      label: 'ID',
      required: false,
    },
    {
      name: 'name',
      type: 'text',
      label: '姓名',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: '電子郵件',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: '密碼',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'phone',
      label: '手機號碼',
      required: false,
    },
  ],
};

export default adminUserCRUDConfig;
