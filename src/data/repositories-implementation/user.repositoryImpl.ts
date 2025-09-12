import type {
  ILoginResponse,
  IUpdateUserDto,
  IUser,
} from "@/domain/entities/user.entity";
import type { IUserRepository } from "@/domain/repositories-interface/user.repository";
import apiService from "../sources/apiService";
import type { IUserInfoInFollow } from "@/domain/entities/follow.entity";
import type { IProfileInfo } from "@/domain/entities/profile.entity";

export class UserRepositoryImpl implements IUserRepository {
  async login(username: string, password: string): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>("/users/login", {
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
    const response = await apiService.post<IUser>("/users/register", {
      displayName,
      username,
      password,
    });
    return response.data;
  }

  async refreshToken(): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>(
      "/users/refresh-token"
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await apiService.post("/users/logout");
  }

  async getUserInformation(userId: string): Promise<IUser> {
    const response = await apiService.get<IUser>(`/users/${userId}`);
    return response.data;
  }

  async loginWithGoogle(code: string): Promise<ILoginResponse> {
    const response = await apiService.post<ILoginResponse>(
      `/users/google-login`,
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
    }>(`/users/${userId}/send-verify-email`, { userId, email });
    return response.data;
  }

  async verifyEmail(
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiService.post<{
      success: boolean;
      message: string;
    }>(`/users/verify-email`, { token });
    return response.data;
  }

  async updateUser(userId: string, data: IUpdateUserDto): Promise<IUser> {
    const response = await apiService.patch<IUser>(`/users/${userId}`, data);
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
    }>(`/users/${userId}/upload-image?type=${type}`, formData, {
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
      `/users/${userId}/update-password`,
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  }

  async follow(targetId: string): Promise<{ success: boolean }> {
    const response = await apiService.post<{ success: boolean }>(
      `/users/follow`,
      { targetId }
    );
    return response.data;
  }

  async unfollow(targetId: string): Promise<{ success: boolean }> {
    const response = await apiService.delete<{ success: boolean }>(
      `/users/follow?targetId=${targetId}`
    );
    return response.data;
  }

  async getFollowers(userId: string): Promise<IUserInfoInFollow[]> {
    const response = await apiService.get<IUserInfoInFollow[]>(
      `/users/${userId}/followers`
    );
    return response.data;
  }

  async getFollowing(userId: string): Promise<IUserInfoInFollow[]> {
    const response = await apiService.get<IUserInfoInFollow[]>(
      `/users/${userId}/following`
    );
    return response.data;
  }

  async isFollowing(targetId: string): Promise<{ isFollowing: boolean }> {
    const response = await apiService.get<{ isFollowing: boolean }>(
      `/users/${targetId}/follow/status`
    );
    return response.data;
  }

  async getUserProfile(profileId: string): Promise<IProfileInfo> {
    const response = await apiService.get<IProfileInfo>(
      `/profiles/${profileId}`
    );
    return response.data;
  }
}
