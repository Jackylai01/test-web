import { FieldConfig } from '@components/Form';

export const mainContactTeacherFieldConfigs: FieldConfig[] = [
  {
    name: 'mainTeacherName',
    type: 'text',
    label: '主要聯絡老師姓名',
    required: true,
  },
  {
    name: 'mainTeacherEmail',
    type: 'email',
    label: '主要聯絡老師信箱',
    required: true,
  },
  {
    name: 'mainTeacherPhone',
    type: 'text',
    label: '主要聯絡老師手機',
    required: true,
  },
];
