export class AuthResponse {
  accessToken!: string;
  refreshToken!: string;
  userInfo!: UserInfo;
}

export class JwtResponse {
  _id!: string;
  exp!: number;
}

export class UserInfo {
  _id!: string;
  name!: string;
  expirationDate: Date | null = null;
  phoneNumber!: string;
}

export class ProfileResponse {
  _id!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  expirationDate: Date | null = null;
}

export class UserCreateAccountResponse {
  _id!: string;
  name!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
}

export enum Role {
  /** 管理端 */
  Admin = 'admin',
  /** 客戶端 */
  Client = 'client',
}

export enum RoleName {
  管理員 = '管理員',
  客戶端 = '客戶端',
}
