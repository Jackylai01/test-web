export class LoginRequest {
  username!: string;
  password!: string;
  accessTokenExpiry!: Date;
  refreshTokenExpiry!: Date;
}

export class RegisterRequest {
  username!: string;
  password!: string;
  confirmPassword!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
  invitationCode?: string;
}

export class SendForgotCodeRequest {
  email!: string;
}

export class ResetPasswordRequest {
  userId!: string;
  code!: string;
  password!: string;
  confirmPassword!: string;
}

export class ThirdPartyRegisterRequest {
  userId!: string;
  username!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
  invitationCode?: string;
}

export class UpdateClientProfileRequest {
  name!: string;
  email!: string;
  phoneNumber?: string;
}

export class UpdateAdminProfileRequest {
  _id!: string;
  name!: string;
  email!: string;
  phoneNumber?: string;
}
export class QueryDateRequest {
  startDate?: Date;
  endDate?: Date;
}
