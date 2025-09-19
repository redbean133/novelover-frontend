import { UserInfoInFollow } from "../entities/follow.entity";
import { ProfileInfo } from "../entities/profile.entity";
import { User, type IUpdateUserDto } from "../entities/user.entity";
import type { IUserRepository } from "../repositories-interface/user.repository";

export const UserUseCase = (userRepository: IUserRepository) => {
  const login = async (username: string, password: string) => {
    const response = await userRepository.login(username, password);
    return response;
  };

  const register = async (
    displayName: string,
    username: string,
    password: string
  ) => {
    const response = await userRepository.register(
      displayName,
      username,
      password
    );
    return response;
  };

  const refreshToken = async () => {
    const response = await userRepository.refreshToken();
    return response;
  };

  const logout = async () => {
    await userRepository.logout();
  };

  const getUserInformation = async (userId: string) => {
    const response = await userRepository.getUserInformation(userId);
    return new User(response);
  };

  const loginWithGoogle = async (code: string) => {
    const response = await userRepository.loginWithGoogle(code);
    return response;
  };

  const sendVerifyEmail = async (userId: string, email: string) => {
    const response = await userRepository.sendVerifyEmail(userId, email);
    return response;
  };

  const verifyEmail = async (token: string) => {
    const response = await userRepository.verifyEmail(token);
    return response;
  };

  const updateUser = async (userId: string, data: IUpdateUserDto) => {
    const response = await userRepository.updateUser(userId, data);
    return new User(response);
  };

  const uploadImage = async (params: {
    userId: string;
    imageBlob: Blob;
    fileName: string;
    type: "avatar" | "cover";
  }) => {
    const response = await userRepository.uploadImage(params);
    return response;
  };

  const updatePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const response = await userRepository.updatePassword(
      userId,
      currentPassword,
      newPassword
    );
    return response;
  };

  const follow = async (targetId: string) => {
    const response = await userRepository.follow(targetId);
    return response;
  };

  const unfollow = async (targetId: string) => {
    const response = await userRepository.unfollow(targetId);
    return response;
  };

  const getFollowers = async (userId: string) => {
    const response = await userRepository.getFollowers(userId);
    return response.map((userInfo) => new UserInfoInFollow(userInfo));
  };

  const getFollowing = async (userId: string) => {
    const response = await userRepository.getFollowing(userId);
    return response.map((userInfo) => new UserInfoInFollow(userInfo));
  };

  const isFollowing = async (targetId: string) => {
    const response = await userRepository.isFollowing(targetId);
    return response;
  };

  const getUserProfile = async (profileId: string) => {
    const response = await userRepository.getUserProfile(profileId);
    return new ProfileInfo(response);
  };

  return {
    login,
    register,
    refreshToken,
    logout,
    getUserInformation,
    loginWithGoogle,
    sendVerifyEmail,
    verifyEmail,
    updateUser,
    uploadImage,
    updatePassword,
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    isFollowing,
    getUserProfile,
  };
};
