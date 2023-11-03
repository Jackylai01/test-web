import type { FieldConfig } from '@components/Form';

export const createRoomFieldConfigs: FieldConfig[] = [
  {
    name: 'leftTeamId',
    type: 'select',
    label: '左方隊伍',
    required: true,
    withEmptyOption: true,
  },
  {
    name: 'rightTeamId',
    type: 'select',
    label: '右方隊伍',
    required: true,
    withEmptyOption: true,
  },
];
