import { CRUDConfig } from '.';

const adminProfileCRUDConfig: CRUDConfig = {
  title: '系統使用者資料編輯',
  apiModuleName: 'admin-profile',
  layout: ['form'],
  actions: ['home', 'save'],
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
      name: 'phoneNumber',
      type: 'phone',
      label: '手機號碼',
      required: false,
    },
  ],
};

export default adminProfileCRUDConfig;
