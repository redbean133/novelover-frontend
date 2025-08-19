import type { ILoginResponse, IUser } from "@/domain/entities/user.entity";
import type { IUserRepository } from "@/domain/repositories-interface/user.repository";
import apiService from "../sources/apiService";

export class UserRepositoryImpl implements IUserRepository {
  async login(username: string, password: string): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>("/user/login", {
      username,
      password,
    });
    return response.data;
  }

  async register(username: string, password: string): Promise<IUser> {
    const response = await apiService.post<IUser>("/user/register", {
      username,
      password,
    });
    return response.data;
  }

  async refreshToken(): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>(
      "/user/refresh-token"
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await apiService.post("/user/logout");
  }

  async getUserInformation(userId: string): Promise<IUser> {
    const response = await apiService.get<IUser>(`/user/${userId}`);
    return response.data;
  }
}
