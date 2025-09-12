import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import type { IUpdateUserDto } from "@/domain/entities/user.entity";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import {
  reinitChangePasswordState,
  reinitCurrentUser,
  reinitManageProfileState,
  updateChangePasswordState,
  updateCurrentUser,
  updateManageProfileState,
  type IUserState,
} from "@/presentation/redux/slices/user.slice";
import type { RootState } from "@/presentation/redux/store";
import {
  validateConfirmPassword,
  validateDisplayName,
  validateEmail,
  validateNewPassword,
  validatePassword,
} from "@/shared/utils/validate";
import { AxiosError } from "axios";
import { identity, pickBy } from "lodash";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const ManageProfileViewModel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userUseCase = UserUseCase(new UserRepositoryImpl());
  const originProfileState = useSelector(
    (state: RootState) => state.user.current
  );
  const manageProfileState = useSelector(
    (state: RootState) => state.user.manageProfile
  );
  const changePasswordState = manageProfileState.changePassword;
  const { id: userIdParam } = useParams<{ id: string }>();
  const { id: currentUserId } = originProfileState;

  const onChangeManageProfileState = (
    value: Partial<IUserState["manageProfile"]>
  ) => {
    dispatch(updateManageProfileState(value));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await userUseCase.getUserInformation(currentUserId);
      dispatch(updateCurrentUser({ ...userInfo }));
      onChangeManageProfileState({ ...userInfo });
    };

    const checkPermission = () => {
      if (userIdParam !== currentUserId) {
        navigate("/");
      } else {
        getUserInfo();
      }
    };

    checkPermission();

    return () => {
      dispatch(reinitManageProfileState());
    };
  }, [currentUserId, userIdParam]);

  const onDisplayNameChange = (value: string) => {
    const validation = validateDisplayName(value);
    onChangeManageProfileState({
      displayName: value,
      isValidDisplayName: validation.isValid,
      displayNameValidation: validation.message,
      updateInfoValidation: "",
    });
  };

  const onEmailChange = (value: string) => {
    const validation = validateEmail(value);
    onChangeManageProfileState({
      email: value,
      isValidEmail: validation.isValid,
      emailValidation: validation.message,
    });
  };

  const sendVerifyEmail = async () => {
    onEmailChange(manageProfileState.email);
    onChangeManageProfileState({ isLoadingVerifyEmail: true });
    try {
      const { success, message } = await userUseCase.sendVerifyEmail(
        currentUserId,
        manageProfileState.email
      );
      if (success) toast.success(message);
    } catch (error) {
      onChangeManageProfileState({
        isValidEmail: false,
        emailValidation:
          error instanceof AxiosError
            ? error.response?.data.message
            : "Lỗi hệ thống, mời thử lại.",
      });
    } finally {
      onChangeManageProfileState({ isLoadingVerifyEmail: false });
    }
  };

  const updateUserInfo = async () => {
    onChangeManageProfileState({ isLoadingSaveInfo: true });
    try {
      const payload: IUpdateUserDto = {
        displayName: manageProfileState.displayName,
        birthday: manageProfileState.birthday,
        gender: manageProfileState.gender,
        about: manageProfileState.about,
        avatarUrl: manageProfileState.avatarUrl,
        coverUrl: manageProfileState.coverUrl,
      };
      const updatedUser = await userUseCase.updateUser(
        currentUserId,
        pickBy(payload, identity)
      );
      if (updatedUser) {
        dispatch(updateCurrentUser({ ...updatedUser }));
        onChangeManageProfileState({ ...updatedUser });
        toast.success("Cập nhật thông tin thành công");
      }
    } catch (error) {
      onChangeManageProfileState({
        updateInfoValidation:
          error instanceof AxiosError
            ? error.response?.data.message
            : "Lỗi hệ thống, mời thử lại.",
      });
    } finally {
      onChangeManageProfileState({ isLoadingSaveInfo: false });
    }
  };

  const uploadAvatar = async (payload: { blob: Blob; fileName: string }) => {
    const { blob, fileName } = payload;
    try {
      const { avatarUrl } = await userUseCase.uploadImage({
        userId: currentUserId,
        imageBlob: blob,
        fileName,
        type: "avatar",
      });
      dispatch(updateCurrentUser({ avatarUrl }));
      onChangeManageProfileState({ avatarUrl });
      toast.success("Cập nhật ảnh đại diện thành công");
      return avatarUrl;
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống, mời thử lại."
      );
    }
  };

  const uploadCover = async (payload: { blob: Blob; fileName: string }) => {
    const { blob, fileName } = payload;
    try {
      const { coverUrl } = await userUseCase.uploadImage({
        userId: currentUserId,
        imageBlob: blob,
        fileName,
        type: "cover",
      });
      dispatch(updateCurrentUser({ coverUrl }));
      onChangeManageProfileState({ coverUrl });
      toast.success("Cập nhật ảnh bìa thành công");
      return coverUrl;
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống, mời thử lại."
      );
    }
  };

  const onCurrentPasswordChange = (value: string) => {
    const validation = validatePassword(value);
    const newPasswordValidation = validateNewPassword(
      value,
      changePasswordState.newPassword
    );
    dispatch(
      updateChangePasswordState({
        currentPassword: value,
        isValidCurrentPassword: validation.isValid,
        currentPasswordValidation: validation.message,
        isValidNewPassword: newPasswordValidation.isValid,
        newPasswordValidation: newPasswordValidation.message,
        formNotification: "",
      })
    );
  };

  const onNewPasswordChange = (value: string) => {
    const validation = validateNewPassword(
      changePasswordState.currentPassword,
      value
    );
    const confirmPasswordValidation = validateConfirmPassword(
      value,
      changePasswordState.confirmPassword
    );
    dispatch(
      updateChangePasswordState({
        newPassword: value,
        isValidNewPassword: validation.isValid,
        newPasswordValidation: validation.message,
        isValidConfirmPassword: confirmPasswordValidation.isValid,
        confirmPasswordValidation: confirmPasswordValidation.message,
        formNotification: "",
      })
    );
  };

  const onConfirmPasswordChange = (value: string) => {
    const validation = validateConfirmPassword(
      changePasswordState.newPassword,
      value
    );
    dispatch(
      updateChangePasswordState({
        confirmPassword: value,
        isValidConfirmPassword: validation.isValid,
        confirmPasswordValidation: validation.message,
        formNotification: "",
      })
    );
  };

  const onSubmitFormChangePassword = async () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      isValidCurrentPassword,
      isValidNewPassword,
      isValidConfirmPassword,
    } = changePasswordState;
    onCurrentPasswordChange(currentPassword);
    onNewPasswordChange(newPassword);
    onConfirmPasswordChange(confirmPassword);

    if (
      isValidCurrentPassword &&
      isValidNewPassword &&
      isValidConfirmPassword
    ) {
      dispatch(
        updateChangePasswordState({
          isLoadingSavePassword: true,
        })
      );
      try {
        const result = await userUseCase.updatePassword(
          currentUserId,
          currentPassword,
          newPassword
        );
        if (result.success) {
          toast.success("Đổi mật khẩu thành công");
          setOpenChangePasswordPopup(false);
        }
      } catch (error) {
        dispatch(
          updateChangePasswordState({
            formNotification:
              error instanceof AxiosError
                ? error.response?.data.message
                : "Lỗi hệ thống, mời thử lại.",
          })
        );
      } finally {
        dispatch(
          updateChangePasswordState({
            isLoadingSavePassword: false,
          })
        );
      }
    }
  };

  const setOpenChangePasswordPopup = (isOpen: boolean) => {
    onChangeManageProfileState({ isOpenChangePasswordPopup: isOpen });
    if (!isOpen) {
      dispatch(reinitChangePasswordState());
    }
  };

  const onClickViewProfile = () => {
    navigate(`/users/${currentUserId}`);
  };

  const handleLogout = async () => {
    try {
      await userUseCase.logout();
    } catch (error) {
      console.log(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(reinitCurrentUser());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
    }
  };

  return {
    onChangeManageProfileState,
    onDisplayNameChange,
    onEmailChange,
    sendVerifyEmail,
    updateUserInfo,
    uploadAvatar,
    uploadCover,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSubmitFormChangePassword,
    setOpenChangePasswordPopup,
    onClickViewProfile,
    handleLogout,
  };
};
