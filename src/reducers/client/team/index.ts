import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Record } from '@models/entities/record/record';
import { Class } from '@models/entities/school/class';
import { Member } from '@models/entities/school/member';
import { SchoolTeam } from '@models/entities/school/school-team';
import { Teacher } from '@models/entities/school/teacher';
import { Team } from '@models/entities/school/team';
import { createSlice } from '@reduxjs/toolkit';
import {
  ClientTeamAsyncAction,
  clientTeamRecordListAsync,
  clientTeamSchoolTeamAsync,
  clientTeamTeamListAsync,
  clientTeamTeamListClassAsync,
  clientTeamTeamListStudentAsync,
  clientTeamTeamListTeacherAsync,
  clientTeamTeamRemoveAsync,
} from './actions';

type AuthState = ApiState<ClientTeamAsyncAction> & {
  schoolTeam: SchoolTeam | null;
  existingMembers: number[] | null;
  teamList: Team[] | null;
  teamListClass: Class[] | null;
  teamListStudent: Member[] | null;
  teamListTeacher: Teacher[] | null;
  recordList: Record[] | null;
};

const initialState: AuthState = {
  schoolTeam: null,
  existingMembers: null,
  teamList: null,
  teamListClass: null,
  teamListStudent: null,
  teamListTeacher: null,
  recordList: null,
  ...newApiState<AuthState>(ClientTeamAsyncAction),
};

const clientTeamSlice = createSlice({
  name: ReducerName.CLIENT_TEAM,
  initialState,
  reducers: {
    resetClientTeamStatus: (state) => {
      state.status = initialState.status;
    },
    resetClientTeam: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(clientTeamSchoolTeamAsync.fulfilled, (state, action) => {
      const existingMembers = [];
      for (const team of action.payload.teams) {
        for (const member of team.members) {
          existingMembers.push(member.id);
        }
      }
      state.schoolTeam = action.payload;
      state.existingMembers = existingMembers;
    });
    builder.addCase(clientTeamTeamListAsync.fulfilled, (state, action) => {
      state.teamList = action.payload;
    });
    builder.addCase(clientTeamTeamListClassAsync.fulfilled, (state, action) => {
      state.teamListClass = action.payload;
    });
    builder.addCase(
      clientTeamTeamListStudentAsync.fulfilled,
      (state, action) => {
        state.teamListStudent = action.payload;
      },
    );
    builder.addCase(
      clientTeamTeamListTeacherAsync.fulfilled,
      (state, action) => {
        state.teamListTeacher = action.payload;
      },
    );
    builder.addCase(clientTeamRecordListAsync.fulfilled, (state, action) => {
      state.recordList = action.payload;
    });
    builder.addCase(clientTeamTeamRemoveAsync.fulfilled, (state, action) => {
      if (!state.schoolTeam) return;
      const index = state.schoolTeam.teams.findIndex(
        (team) => team._id === action.payload.teamId,
      );
      if (index !== -1) state.schoolTeam?.teams.splice(index, 1);
    });
    asyncMatcher(builder, ReducerName.CLIENT_TEAM);
  },
});

export const { resetClientTeamStatus, resetClientTeam } =
  clientTeamSlice.actions;
export default clientTeamSlice.reducer;
