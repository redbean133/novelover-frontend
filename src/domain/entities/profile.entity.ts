import type { Gender } from "@/shared/constants/constants";

export interface IUserPublicInfo {
  id: string;
  username: string;
  displayName: string;
  birthday: string;
  gender: Gender;
  about: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  createdAt: string;
  followersCount: number;
  followingCount: number;
}

// Use in profile page
export class UserPublicInfo {
  id: string;
  username: string;
  displayName: string;
  birthday: string;
  gender: Gender;
  about: string;
  avatarUrl: string;
  coverUrl: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;

  constructor(data: IUserPublicInfo) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
    this.birthday = data.birthday || "";
    this.gender = data.gender;
    this.about = data.about || "";
    this.avatarUrl = data.avatarUrl || "";
    this.coverUrl = data.coverUrl || "";
    this.createdAt = data.createdAt || "";
    this.followersCount = data.followersCount;
    this.followingCount = data.followingCount;
  }
}

export interface IProfileInfo {
  user: IUserPublicInfo;
}

export class ProfileInfo {
  user: UserPublicInfo;

  constructor(data: IProfileInfo) {
    this.user = new UserPublicInfo(data.user);
  }
}
