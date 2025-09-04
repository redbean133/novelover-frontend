import type {
  ILoginResponse,
  IUpdateUserDto,
  IUser,
} from "../entities/user.entity";

export interface IUserRepository {
  login: (username: string, password: string) => Promise<ILoginResponse>;

  register: (
    displayName: string,
    username: string,
    password: string
  ) => Promise<IUser>;

  refreshToken: () => Promise<ILoginResponse>;

  logout: () => Promise<void>;

  getUserInformation: (userId: string) => Promise<IUser>;

  loginWithGoogle: (code: string) => Promise<ILoginResponse>;

  sendVerifyEmail: (
    userId: string,
    email: string
  ) => Promise<{ success: boolean; message: string }>;

  verifyEmail: (
    token: string
  ) => Promise<{ success: boolean; message: string }>;

  updateUser: (userId: string, data: IUpdateUserDto) => Promise<IUser>;

  uploadImage: (params: {
    userId: string;
    imageBlob: Blob;
    fileName: string;
    type: "avatar" | "cover";
  }) => Promise<{ avatarUrl?: string; coverUrl?: string }>;

  updatePassword: (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean }>;
}
