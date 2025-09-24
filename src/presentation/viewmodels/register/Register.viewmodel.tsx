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
  validateDisplayName,
  validatePassword,
  validateUsername,
} from "@/shared/utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const RegisterViewModel = () => {
  const userUseCase = useMemo(() => UserUseCase(new UserRepositoryImpl()), []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    displayName,
    username,
    password,
    confirmPassword,
    isValidDisplayName,
    isValidPassword,
    isValidUsername,
    isValidConfirmPassword,
  } = useSelector((state: RootState) => state.user.register);

  const updateRegister = (data: Partial<IUserState["register"]>) => {
    dispatch(updateRegisterState(data));
  };

  const onDisplayNameChange = (value: string) => {
    const validation = validateDisplayName(value);
    updateRegister({
      displayName: value,
      isValidDisplayName: validation.isValid,
      displayNameValidation: validation.message,
      registerValidation: "",
    });
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
    onDisplayNameChange(displayName);
    onUsernameChange(username);
    onPasswordChange(password);

    if (
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidDisplayName
    ) {
      updateRegister({ isLoading: true });
      try {
        await userUseCase.register(displayName, username, password);
        toast.success("Đăng ký tài khoản thành công. Vui lòng đăng nhập.");
        navigate("/login");
      } catch (error) {
        updateRegister({
          registerValidation:
            error instanceof AxiosError
              ? error.response?.data.message
              : "Lỗi hệ thống, mời thử lại.",
        });
      } finally {
        updateRegister({ isLoading: false });
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
    onDisplayNameChange,
    onUsernameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmitForm,
  };
};
