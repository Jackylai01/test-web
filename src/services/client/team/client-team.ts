import { Record } from '@models/entities/record/record';
import { Class } from '@models/entities/school/class';
import { Member } from '@models/entities/school/member';
import {
  MainContactTeacher,
  SchoolTeam,
} from '@models/entities/school/school-team';
import { Teacher } from '@models/entities/school/teacher';
import { Team } from '@models/entities/school/team';
import {
  ApiListResult,
  ApiResult,
  deleteRequest,
  getRequest,
  putRequest,
} from '@services/shared/api';

/**
 * 前台-查看學校隊伍
 * @throws 404 NotFound 查無資料
 */
export const apiTeamDetailSchoolTeam = async (schoolCode: string) =>
  getRequest<ApiResult<SchoolTeam>>(`/team/info/${schoolCode}`);

/**
 * 前台-儲存主要聯絡老師
 * @throws 404 NotFound 查無資料
 */
export const apiTeamSaveMainContactTeacher = async (
  schoolCode: string,
  data: MainContactTeacher,
) => putRequest<SchoolTeam>(`/team/save-main-teacher/${schoolCode}`, data);

/**
 * 前台-列表隊伍
 */
export const apiTeamListTeam = (schoolCode: string) =>
  getRequest<ApiListResult<Team>>(`/team/teams/${schoolCode}`);

/**
 * 前台-新增隊伍
 */
export const apiTeamCreateTeam = async (schoolCode: string, data: Team) =>
  putRequest<SchoolTeam>(`/team/save/${schoolCode}`, data);

/**
 * 前台-刪除隊伍
 */
export const apiTeamRemoveTeam = async (schoolCode: string, teamId: string) =>
  deleteRequest(`/team/remove/${schoolCode}/${teamId}`);

/**
 * 前台-列表班級
 */
export const apiTeamListClass = async (schoolCode: string) =>
  getRequest<ApiListResult<Class>>(`/team/class-list/${schoolCode}`);

/**
 * 前台-列表隊伍學生
 */
export const apiTeamListStudent = async (schoolCode: string, classId: string) =>
  getRequest<ApiListResult<Member>>(
    `/team/student-list/${schoolCode}/${classId}`,
  );

/**
 * 前台-列表老師
 */
export const apiTeamListTeacher = (schoolCode: string) =>
  getRequest<ApiListResult<Teacher>>(`/team/all-teachers/${schoolCode}`);

/**
 * 前台-列表答題紀錄
 */
export const apiTeamListRecord = (schoolCode: string, teamId: string) =>
  getRequest<ApiListResult<Record>>(`/team/records/${schoolCode}/${teamId}`);

/**
 * 前台-刪除遊戲
 */
export const apiTeamRemoveGame = (teamId: string) =>
  deleteRequest(`/team/delete-preliminary-game/${teamId}`);
