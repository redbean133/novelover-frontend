import type {
  AccountStatus,
  Gender,
  UserRole,
} from "@/shared/constants/constants";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IUser {
  id: string;
  username: string;
  displayName: string | null;
  email: string | null;
  gender: Gender;
  about: string | null;
  role: UserRole;
  status: AccountStatus;
  deletedAt: Date | null;
}
