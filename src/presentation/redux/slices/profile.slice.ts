import type { UserInfoInFollow } from "@/domain/entities/follow.entity";
import type { PublicNovelInList } from "@/domain/entities/novel.entity";
import type { UserPublicInfo } from "@/domain/entities/profile.entity";
import { Gender } from "@/shared/constants/constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IProfileState {
  isLoadingProfile: boolean;
  isMyProfile: boolean;
  isFollowing: boolean;
  isUpdateFollow: boolean;

  followListType: "followers" | "following" | null;
  isLoadingFollowList: boolean;
  isOpenFollowPopup: boolean;
  followList: UserInfoInFollow[];

  user: UserPublicInfo;

  novels: {
    data: PublicNovelInList[];
    total: number;
  };
}

const initialState: IProfileState = {
  isLoadingProfile: false,
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

  novels: {
    data: [],
    total: 0,
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
    updateNovelsData: (
      state,
      action: PayloadAction<Partial<IProfileState["novels"]>>
    ) => {
      state.novels = { ...state.novels, ...action.payload };
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
  updateNovelsData,
} = profileSlice.actions;
export default profileSlice.reducer;
