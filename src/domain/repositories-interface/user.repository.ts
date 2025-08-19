import type { ILoginResponse, IUser } from "../entities/user.entity";

export interface IUserRepository {
  login: (username: string, password: string) => Promise<ILoginResponse>;
  register: (username: string, password: string) => Promise<IUser>;
  refreshToken: () => Promise<ILoginResponse>;
  logout: () => Promise<void>;
  getUserInformation: (userId: string) => Promise<IUser>;
}
