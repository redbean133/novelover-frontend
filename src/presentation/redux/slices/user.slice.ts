import type { IUser } from "@/domain/entities/user.entity";
import { AccountStatus, Gender, UserRole } from "@/shared/constants/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  login: {
    username: string;
    password: string;
    isValidUsername: boolean;
    usernameValidation: string;
    isValidPassword: boolean;
    passwordValidation: string;
    loginValidation: string;
  };
  register: {
    username: string;
    password: string;
    confirmPassword: string;
    isValidUsername: boolean;
    usernameValidation: string;
    isValidPassword: boolean;
    passwordValidation: string;
    isValidConfirmPassword: boolean;
    confirmPasswordValidation: string;
    registerValidation: string;
  };
  current: IUser;
}

const initialLoginState = {
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
  displayName: null,
  email: null,
  gender: Gender.Unknown,
  about: null,
  role: UserRole.Normal,
  status: AccountStatus.Normal,
  deletedAt: null,
};

const initialRegisterState = {
  username: "",
  password: "",
  confirmPassword: "",
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
    updateCurrentUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.current = { ...state.current, ...action.payload };
    },
    updateRegisterState: (
      state,
      action: PayloadAction<Partial<IUserState["register"]>>
    ) => {
      state.register = { ...state.register, ...action.payload };
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
  },
});

export const {
  updateLoginState,
  updateCurrentUser,
  updateRegisterState,
  reinitCurrentUser,
  reinitLoginState,
  reinitRegisterState,
} = userSlice.actions;
export default userSlice.reducer;
