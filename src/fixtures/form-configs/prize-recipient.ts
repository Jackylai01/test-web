import type { FieldConfig } from '@components/Form';
import {
  EmailRegex,
  PhoneNumberRegex,
  TelephoneNumberRegex,
  isIdNumberValid,
} from '@helpers/validation';
import { PrizeType } from '@models/entities/prize-recipient';

export const redeemCodeFieldConfigs: FieldConfig[] = [
  {
    name: 'redeemCode',
    type: 'text',
    label: '兌獎序號',
    required: true,
  },
];

export const prizeRecipientFieldConfigs: FieldConfig[] = [
  {
    name: '_id',
    type: 'hidden',
    label: 'ID',
    required: false,
  },
  {
    name: 'redeemCode',
    type: 'hidden',
    label: '兌獎序號',
    required: false,
  },
  {
    name: 'type',
    type: 'hidden',
    label: '類型',
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
    type: 'text',
    label: '電子郵件',
    placeholder: '範例：example@gmail.com',
    pattern: {
      value: EmailRegex,
      message: '需符合常見的電子信箱格式並包括 @',
    },
    required: true,
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: '市話',
    placeholder: '範例：(02)12345678',
    required: false,
    pattern: {
      value: TelephoneNumberRegex,
      message:
        '市內電話需為2~3碼區域碼開頭，再加上7~8碼的數字，區域碼需包含括號',
    },
    validateObserver: {
      observer: 'mobileNumber',
      condition: (value: string) => !value,
      newValidate: (value: string) => !!value || '市話與手機擇一填寫',
    },
  },
  {
    name: 'mobileNumber',
    type: 'text',
    label: '手機',
    placeholder: '範例：091234578',
    required: false,
    pattern: {
      value: PhoneNumberRegex,
      message: '手機號碼需為09開頭的10位數字，不包含任何符號與空白',
    },
    validateObserver: {
      observer: 'phoneNumber',
      condition: (value: string) => !value,
      newValidate: (value: string) => !!value || '市話與手機擇一填寫',
    },
  },
  {
    name: 'idNumber',
    type: 'text',
    label: '身分證字號',
    required: true,
    validate: (value: string) => isIdNumberValid(value) || '輸入身分證字號無效',
    conditionObserver: {
      observer: 'type',
      conditions: [PrizeType.Facebook],
    },
  },
  {
    name: 'idCardFront',
    type: 'imageSelect',
    label: '身分證明文件 正面',
    required: true,
    accept: 'image/*',
    conditionObserver: {
      observer: 'type',
      conditions: [PrizeType.Facebook],
    },
  },
  {
    name: 'idCardBack',
    type: 'imageSelect',
    label: '身分證明文件 反面',
    required: true,
    accept: 'image/*',
    conditionObserver: {
      observer: 'type',
      conditions: [PrizeType.Facebook],
    },
  },
  {
    name: 'contactAddress',
    type: 'text',
    label: '通訊地址',
    required: true,
  },
  {
    name: 'householdAddress',
    type: 'text',
    label: '戶籍地址',
    required: true,
  },
  {
    name: 'signature',
    type: 'signature',
    label: '簽名檔',
    required: true,
  },
];
