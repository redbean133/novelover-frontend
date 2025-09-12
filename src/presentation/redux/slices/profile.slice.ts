import type { UserInfoInFollow } from "@/domain/entities/follow.entity";
import type { UserPublicInfo } from "@/domain/entities/profile.entity";
import { Gender } from "@/shared/constants/constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IProfileState {
  isMyProfile: boolean;
  isFollowing: boolean;
  isUpdateFollow: boolean;

  followListType: "followers" | "following" | null;
  isLoadingFollowList: boolean;
  isOpenFollowPopup: boolean;
  followList: UserInfoInFollow[];

  user: UserPublicInfo;
}

const initialState: IProfileState = {
  isMyProfile: false,
  isFollowing: false,
  isUpdateFollow: false,

  followListType: null,
  isLoadingFollowList: false,
  isOpenFollowPopup: false,
  followList: [],

  user: {
    id: "",
    username: "",
    displayName: "",
    birthday: "",
    gender: Gender.Unknown,
    about: "",
    avatarUrl: "",
    coverUrl: "",
    createdAt: "",
    followersCount: 0,
    followingCount: 0,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileState: (
      state,
      action: PayloadAction<Partial<IProfileState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateUserProfile: (
      state,
      action: PayloadAction<Partial<UserPublicInfo>>
    ) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateFollowStatus: (
      state,
      action: PayloadAction<{ userId: string; isFollowing: boolean }>
    ) => {
      const user = state.followList.find(
        (user) => user.id === action.payload.userId
      );
      if (user) {
        user.isFollowing = action.payload.isFollowing;
      }
    },
    reinitFollowPopup: (state) => {
      state.followListType = initialState.followListType;
      state.followList = initialState.followList;
      state.isOpenFollowPopup = initialState.isOpenFollowPopup;
    },
  },
});

export const {
  updateProfileState,
  updateUserProfile,
  reinitFollowPopup,
  updateFollowStatus,
} = profileSlice.actions;
export default profileSlice.reducer;
