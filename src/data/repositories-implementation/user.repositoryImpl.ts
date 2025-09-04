import type {
  ILoginResponse,
  IUpdateUserDto,
  IUser,
} from "@/domain/entities/user.entity";
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

  async register(
    displayName: string,
    username: string,
    password: string
  ): Promise<IUser> {
    const response = await apiService.post<IUser>("/user/register", {
      displayName,
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

  async loginWithGoogle(code: string): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>(
      `/user/google-login`,
      { code }
    );
    return response.data;
  }

  async sendVerifyEmail(
    userId: string,
    email: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiService.post<{
      success: boolean;
      message: string;
    }>(`/user/${userId}/send-verify-email`, { userId, email });
    return response.data;
  }

  async verifyEmail(
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiService.post<{
      success: boolean;
      message: string;
    }>(`/user/verify-email`, { token });
    return response.data;
  }

  async updateUser(userId: string, data: IUpdateUserDto): Promise<IUser> {
    const response = await apiService.patch<IUser>(`/user/${userId}`, data);
    return response.data;
  }

  async uploadImage(params: {
    userId: string;
    imageBlob: Blob;
    fileName: string;
    type: "avatar" | "cover";
  }): Promise<{ avatarUrl?: string; coverUrl?: string }> {
    const { userId, imageBlob, fileName, type } = params;

    const formData = new FormData();
    formData.append("file", imageBlob, fileName);

    const response = await apiService.patch<{
      avatarUrl?: string;
      coverUrl?: string;
    }>(`/user/${userId}/upload-image?type=${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean }> {
    const response = await apiService.patch<{ success: boolean }>(
      `/user/${userId}/update-password`,
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  }
}
