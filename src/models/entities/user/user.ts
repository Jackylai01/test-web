/** 使用者 */
export type User = {
  /** ID */
  _id: string;
  /** 是否為老師 */
  isTeacher: boolean;
  /** 是否為學生 */
  isStudent: boolean;
  /** 學校列表 */
  schools: School[];
};

/** 學校 */
export type School = {
  /** 賽區 */
  area: string;
  /** 學校 */
  schoolName: string;
  /** 學校編碼 */
  schoolCode: string;
  /** {schoolCode}.ntpc.edu.tw */
  dsns: string;
  /** 老師 ID */
  teacherId?: string;
  /** 學生 ID */
  studentId?: string;
  /** 班級 ID  */
  classId?: string;
  /** 班級名稱 */
  className?: string;
  /** 學年 */
  gradeYear?: number;
};
