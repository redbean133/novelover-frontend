import type {
  AccountStatus,
  Gender,
  UserRole,
} from "@/shared/constants/constants";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IUpdateUserDto {
  password?: string;
  displayName?: string;
  birthday?: string;
  gender?: Gender;
  about?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export const updateUserDtoKeys = [
  "password",
  "displayName",
  "birthday",
  "gender",
  "about",
  "avatarUrl",
  "coverUrl",
];

export interface ILoginResponse {
  accessToken: string;
}

export interface IUser {
  id: string;
  username: string;
  displayName: string;
  birthday: string;
  email: string | null;
  emailVerified: boolean;
  gender: Gender;
  about: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  role: UserRole;
  status: AccountStatus;
  deletedAt: string;
  providerId: string | null;
  providerType: string | null;
  createdAt: string;
  updatedAt: string;
}

export class User {
  id: string;
  username: string;
  displayName: string;
  birthday: string;
  email: string;
  emailVerified: boolean;
  gender: Gender;
  about: string;
  avatarUrl: string;
  coverUrl: string;
  role: UserRole;
  status: AccountStatus;
  deletedAt: string;
  providerId: string;
  providerType: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
    this.birthday = data.birthday || "";
    this.email = data.email || "";
    this.emailVerified = data.emailVerified;
    this.gender = data.gender;
    this.about = data.about || "";
    this.avatarUrl = data.avatarUrl || "";
    this.coverUrl = data.coverUrl || "";
    this.role = data.role;
    this.status = data.status;
    this.deletedAt = data.deletedAt || "";
    this.providerId = data.providerId || "";
    this.providerType = data.providerType || "";
    this.createdAt = data.createdAt || "";
    this.updatedAt = data.updatedAt || "";
  }
}
