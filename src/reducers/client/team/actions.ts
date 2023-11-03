import { ReducerName } from '@enums/reducer-name';
import { MainContactTeacher } from '@models/entities/school/school-team';
import { Team } from '@models/entities/school/team';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiTeamCreateTeam,
  apiTeamDetailSchoolTeam,
  apiTeamListClass,
  apiTeamListRecord,
  apiTeamListStudent,
  apiTeamListTeacher,
  apiTeamListTeam,
  apiTeamRemoveGame,
  apiTeamRemoveTeam,
  apiTeamSaveMainContactTeacher,
} from '@services/client/team/client-team';

export enum ClientTeamAsyncAction {
  schoolTeam = 'schoolTeam',
  saveMainContactPerson = 'saveMainContactPerson',
  teamList = 'teamList',
  teamListClass = 'teamListClass',
  teamListStudent = 'teamListStudent',
  teamListTeacher = 'teamListTeacher',
  teamCreate = 'teamCreate',
  teamRemove = 'teamRemove',
  recordList = 'recordList',
  teamRemoveGame = 'teamRemoveGame',
}

export const clientTeamSchoolTeamAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.schoolTeam}`,
  async (schoolCode: string) => {
    const response = await apiTeamDetailSchoolTeam(schoolCode);
    return response.result.data;
  },
);

export const clientTeamSaveMainContactTeacherAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.saveMainContactPerson}`,
  async ({
    schoolCode,
    data,
  }: {
    schoolCode: string;
    data: MainContactTeacher;
  }) => {
    await apiTeamSaveMainContactTeacher(schoolCode, data);
  },
);

export const clientTeamTeamListAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamList}`,
  async (schoolCode: string) => {
    const response = await apiTeamListTeam(schoolCode);
    return response.result.data;
  },
);

export const clientTeamTeamListClassAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamListClass}`,
  async (schoolCode: string) => {
    const response = await apiTeamListClass(schoolCode);
    return response.result.data;
  },
);

export const clientTeamTeamListStudentAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamListStudent}`,
  async ({ schoolCode, classId }: { schoolCode: string; classId: string }) => {
    const response = await apiTeamListStudent(schoolCode, classId);
    return response.result.data;
  },
);

export const clientTeamTeamListTeacherAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamListTeacher}`,
  async (schoolCode: string) => {
    const response = await apiTeamListTeacher(schoolCode);
    return response.result.data;
  },
);

export const clientTeamTeamCreateAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamCreate}`,
  async ({ schoolCode, data }: { schoolCode: string; data: Team }) => {
    await apiTeamCreateTeam(schoolCode, data);
  },
);

export const clientTeamTeamRemoveAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamRemove}`,
  async ({ schoolCode, teamId }: { schoolCode: string; teamId: string }) => {
    await apiTeamRemoveTeam(schoolCode, teamId);
    return { schoolCode, teamId };
  },
);

export const clientTeamRecordListAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.recordList}`,
  async ({ schoolCode, teamId }: { schoolCode: string; teamId: string }) => {
    const response = await apiTeamListRecord(schoolCode, teamId);
    // return teamRecordList;
    return response.result.data;
  },
);

export const clientTeamRemoveGameAsync = createAsyncThunk(
  `${ReducerName.CLIENT_TEAM}/${ClientTeamAsyncAction.teamRemoveGame}`,
  async (teamId: string) => {
    await apiTeamRemoveGame(teamId);
  },
);
