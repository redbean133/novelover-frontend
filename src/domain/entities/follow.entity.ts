export interface IUserInfoInFollow {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  isFollowing: boolean;
}

export class UserInfoInFollow {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isFollowing: boolean;

  constructor(data: IUserInfoInFollow) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
    this.avatarUrl = data.avatarUrl || "";
    this.isFollowing = data.isFollowing;
  }
}
