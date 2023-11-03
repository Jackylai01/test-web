import { Team } from './team';

export type SchoolTeam = {
  schoolCode: string;
  schoolName: string;
  allowedTotalTeams: number;
  mainTeacherName: string;
  mainTeacherEmail: string;
  mainTeacherPhone: string;
  registerStartDate: Date;
  registerEndDate: Date;
  individualStartDate: Date;
  individualEndDate: Date;
  preliminaryStartDate: Date;
  preliminaryEndDate: Date;
  teams: Team[];
};

export type MainContactTeacher = {
  mainTeacherName: string;
  mainTeacherEmail: string;
  mainTeacherPhone: string;
};
