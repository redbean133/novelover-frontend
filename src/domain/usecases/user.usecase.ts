import type { IUserRepository } from "../repositories-interface/user.repository";

export const UserUseCase = (userRepository: IUserRepository) => {
  const login = async (username: string, password: string) => {
    const response = await userRepository.login(username, password);
    return response;
  };

  const register = async (username: string, password: string) => {
    const response = await userRepository.register(username, password);
    return response;
  };

  const refreshToken = async () => {
    const response = await userRepository.refreshToken();
    return response;
  };

  const logout = async () => {
    await userRepository.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
  };

  const getUserInformation = async (userId: string) => {
    const response = await userRepository.getUserInformation(userId);
    return response;
  };

  return {
    login,
    register,
    refreshToken,
    logout,
    getUserInformation,
  };
};
