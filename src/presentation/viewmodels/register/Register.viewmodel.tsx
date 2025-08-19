import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import {
  reinitRegisterState,
  updateRegisterState,
  type IUserState,
} from "@/presentation/redux/slices/user.slice";
import type { RootState } from "@/presentation/redux/store";
import {
  validateConfirmPassword,
  validatePassword,
  validateUsername,
} from "@/shared/utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const RegisterViewModel = () => {
  const userUseCase = UserUseCase(new UserRepositoryImpl());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username,
    password,
    confirmPassword,
    isValidPassword,
    isValidUsername,
    isValidConfirmPassword,
  } = useSelector((state: RootState) => state.user.register);

  const updateRegister = (data: Partial<IUserState["register"]>) => {
    dispatch(updateRegisterState(data));
  };

  const onUsernameChange = (value: string) => {
    const validation = validateUsername(value);
    updateRegister({
      username: value,
      isValidUsername: validation.isValid,
      usernameValidation: validation.message,
      registerValidation: "",
    });
  };

  const onPasswordChange = (value: string) => {
    const validation = validatePassword(value);
    const confirmPasswordValidation = validateConfirmPassword(
      value,
      confirmPassword
    );
    updateRegister({
      password: value,
      isValidPassword: validation.isValid,
      passwordValidation: validation.message,
      isValidConfirmPassword: confirmPasswordValidation.isValid,
      confirmPasswordValidation: confirmPasswordValidation.message,
      registerValidation: "",
    });
  };

  const onConfirmPasswordChange = (value: string) => {
    const validation = validateConfirmPassword(password, value);
    updateRegister({
      confirmPassword: value,
      isValidConfirmPassword: validation.isValid,
      confirmPasswordValidation: validation.message,
      registerValidation: "",
    });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUsernameChange(username);
    onPasswordChange(password);

    if (isValidUsername && isValidPassword && isValidConfirmPassword) {
      try {
        await userUseCase.register(username, password);
        toast.success("Đăng ký tài khoản thành công. Vui lòng đăng nhập.");
        navigate("/login");
      } catch (error) {
        updateRegister({
          registerValidation:
            error instanceof AxiosError
              ? error.response?.data.message
              : "Lỗi hệ thống, mời thử lại.",
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(reinitRegisterState());
    };
  }, []);

  return {
    updateRegister,
    onUsernameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmitForm,
  };
};
