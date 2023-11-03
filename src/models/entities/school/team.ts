import { BaseEntity } from '../shared/base-entity';
import { Member } from './member';
import { Teacher } from './teacher';

export type Team = BaseEntity & {
  name: string;
  teacher: Teacher;
  teacherEmail: string;
  teacherPhone: string;
  members: Member[];
  schoolCode?: string;
  schoolName?: string;
  area?: string;
  remainingSeconds?: number;
  hasOngoingGame?: boolean;
  gameCount?: number;
};
