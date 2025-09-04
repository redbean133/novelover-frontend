import { updateUserDtoKeys, type User } from "@/domain/entities/user.entity";
import { AccountStatus, Gender, UserRole } from "@/shared/constants/constants";
import { isChanged } from "@/shared/utils/helpers";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  login: {
    isLoading: boolean;
    username: string;
    password: string;
    isValidUsername: boolean;
    usernameValidation: string;
    isValidPassword: boolean;
    passwordValidation: string;
    loginValidation: string;
  };
  register: {
    isLoading: boolean;
    displayName: string;
    username: string;
    password: string;
    confirmPassword: string;
    isValidDisplayName: boolean;
    displayNameValidation: string;
    isValidUsername: boolean;
    usernameValidation: string;
    isValidPassword: boolean;
    passwordValidation: string;
    isValidConfirmPassword: boolean;
    confirmPasswordValidation: string;
    registerValidation: string;
  };
  current: User;
  manageProfile: User & {
    isLoadingSaveInfo: boolean;
    isLoadingVerifyEmail: boolean;
    isValidEmail: boolean;
    emailValidation: string;
    isValidDisplayName: boolean;
    displayNameValidation: string;
    isChangedInfo: boolean;
    updateInfoValidation: string;

    isOpenChangePasswordPopup: boolean;
    changePassword: {
      isLoadingSavePassword: boolean;
      formNotification: string;
      currentPassword: string;
      isValidCurrentPassword: boolean;
      currentPasswordValidation: string;
      newPassword: string;
      isValidNewPassword: boolean;
      newPasswordValidation: string;
      confirmPassword: string;
      isValidConfirmPassword: boolean;
      confirmPasswordValidation: string;
    };
  };
}

const initialLoginState = {
  isLoading: false,
  username: "",
  password: "",
  isValidUsername: false,
  usernameValidation: "",
  isValidPassword: false,
  passwordValidation: "",
  loginValidation: "",
};

const initialCurrentState = {
  id: "",
  username: "",
  displayName: "",
  birthday: "",
  email: "",
  emailVerified: false,
  gender: Gender.Unknown,
  about: "",
  avatarUrl: "",
  coverUrl: "",
  role: UserRole.Normal,
  status: AccountStatus.Normal,
  deletedAt: "",
  providerId: "",
  providerType: "",
  createdAt: "",
  updatedAt: "",
};

const initialRegisterState = {
  isLoading: false,
  displayName: "",
  username: "",
  password: "",
  confirmPassword: "",
  isValidDisplayName: false,
  displayNameValidation: "",
  isValidUsername: false,
  usernameValidation: "",
  isValidPassword: false,
  passwordValidation: "",
  isValidConfirmPassword: false,
  confirmPasswordValidation: "",
  registerValidation: "",
};

const initialState: IUserState = {
  login: initialLoginState,
  current: initialCurrentState,
  register: initialRegisterState,
  manageProfile: {
    ...initialCurrentState,
    isLoadingSaveInfo: false,
    isLoadingVerifyEmail: false,
    isValidEmail: false,
    emailValidation: "",
    isValidDisplayName: true,
    displayNameValidation: "",
    isChangedInfo: false,
    updateInfoValidation: "",

    isOpenChangePasswordPopup: false,
    changePassword: {
      isLoadingSavePassword: false,
      formNotification: "",
      currentPassword: "",
      isValidCurrentPassword: false,
      currentPasswordValidation: "",
      newPassword: "",
      isValidNewPassword: false,
      newPasswordValidation: "",
      confirmPassword: "",
      isValidConfirmPassword: false,
      confirmPasswordValidation: "",
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLoginState: (
      state,
      action: PayloadAction<Partial<IUserState["login"]>>
    ) => {
      state.login = { ...state.login, ...action.payload };
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      state.current = { ...state.current, ...action.payload };
    },
    updateRegisterState: (
      state,
      action: PayloadAction<Partial<IUserState["register"]>>
    ) => {
      state.register = { ...state.register, ...action.payload };
    },
    updateManageProfileState: (
      state,
      action: PayloadAction<Partial<IUserState["manageProfile"]>>
    ) => {
      state.manageProfile = { ...state.manageProfile, ...action.payload };
      state.manageProfile.isChangedInfo = isChanged(
        state.manageProfile,
        state.current,
        updateUserDtoKeys
      );
    },
    updateChangePasswordState: (
      state,
      action: PayloadAction<
        Partial<IUserState["manageProfile"]["changePassword"]>
      >
    ) => {
      state.manageProfile.changePassword = {
        ...state.manageProfile.changePassword,
        ...action.payload,
      };
    },
    reinitCurrentUser: (state) => {
      state.current = initialCurrentState;
    },
    reinitLoginState: (state) => {
      state.login = initialLoginState;
    },
    reinitRegisterState: (state) => {
      state.register = initialRegisterState;
    },
    reinitManageProfileState: (state) => {
      state.manageProfile = initialState.manageProfile;
    },
    reinitChangePasswordState: (state) => {
      state.manageProfile.changePassword =
        initialState.manageProfile.changePassword;
    },
  },
});

export const {
  updateLoginState,
  updateCurrentUser,
  updateRegisterState,
  updateManageProfileState,
  updateChangePasswordState,
  reinitCurrentUser,
  reinitLoginState,
  reinitRegisterState,
  reinitManageProfileState,
  reinitChangePasswordState,
} = userSlice.actions;
export default userSlice.reducer;
