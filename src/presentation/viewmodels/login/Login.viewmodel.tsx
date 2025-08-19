import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import {
  reinitLoginState,
  updateCurrentUser,
  updateLoginState,
  type IUserState,
} from "@/presentation/redux/slices/user.slice";
import type { RootState } from "@/presentation/redux/store";
import { validatePassword, validateUsername } from "@/shared/utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "@/shared/utils/helpers";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const LoginViewModel = () => {
  const userUseCase = UserUseCase(new UserRepositoryImpl());
  const dispatch = useDispatch();
  const { username, password, isValidPassword, isValidUsername } = useSelector(
    (state: RootState) => state.user.login
  );

  const updateLogin = (data: Partial<IUserState["login"]>) => {
    dispatch(updateLoginState(data));
  };

  const onUsernameChange = (value: string) => {
    const validation = validateUsername(value);
    updateLogin({
      username: value,
      isValidUsername: validation.isValid,
      usernameValidation: validation.message,
      loginValidation: "",
    });
  };

  const onPasswordChange = (value: string) => {
    const validation = validatePassword(value);
    updateLogin({
      password: value,
      isValidPassword: validation.isValid,
      passwordValidation: validation.message,
      loginValidation: "",
    });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUsernameChange(username);
    onPasswordChange(password);

    if (isValidUsername && isValidPassword) {
      try {
        const { accessToken } = await userUseCase.login(username, password);

        const decodeToken = decodeJwt(accessToken);
        dispatch(
          updateCurrentUser({
            id: decodeToken.sub,
            role: decodeToken.role,
            username: decodeToken.username,
          })
        );
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessTokenExpiry", decodeToken.exp.toString());
      } catch (error) {
        updateLogin({
          loginValidation:
            error instanceof AxiosError
              ? error.response?.data.message
              : "Lỗi hệ thống, mời thử lại.",
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(reinitLoginState());
    };
  }, []);

  return {
    updateLogin,
    onUsernameChange,
    onPasswordChange,
    onSubmitForm,
  };
};
