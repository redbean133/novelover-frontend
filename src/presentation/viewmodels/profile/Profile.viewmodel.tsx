import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { reinitNovelDetailState } from "@/presentation/redux/slices/novelDetail.slice";
import {
  reinitFollowPopup,
  updateFollowStatus,
  updateNovelsData,
  updateProfileState,
  updateUserProfile,
} from "@/presentation/redux/slices/profile.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const ProfileViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: profileId } = useParams();
  const userUseCase = useMemo(() => UserUseCase(new UserRepositoryImpl()), []);
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );
  const profileUserInfo = useSelector((state: RootState) => state.profile.user);
  const { isLoadingFollowList, isLoadingProfile } = useSelector(
    (state: RootState) => state.profile
  );

  const getUserProfile = async () => {
    if (isLoadingProfile) return;
    try {
      dispatch(updateProfileState({ isLoadingProfile: true }));
      const { user, novels } = await userUseCase.getUserProfile(profileId!);
      dispatch(updateUserProfile({ ...user }));
      dispatch(updateNovelsData({ ...novels }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateProfileState({ isLoadingProfile: false }));
    }
  };

  const checkFollow = async () => {
    if (!currentUserId || profileId === currentUserId) return;
    const { isFollowing } = await userUseCase.isFollowing(profileId!);
    dispatch(updateProfileState({ isFollowing }));
  };

  useEffect(() => {
    dispatch(reinitFollowPopup());
    getUserProfile();
  }, [profileId]);

  useEffect(() => {
    dispatch(updateProfileState({ isMyProfile: profileId === currentUserId }));
    checkFollow();
  }, [profileId, currentUserId]);

  const goToManageProfilePage = () => {
    navigate(`/users/${currentUserId}/manage`);
  };

  const follow = async (targetId: string, doAfterFollow: () => void) => {
    try {
      dispatch(updateProfileState({ isUpdateFollow: true }));
      const { success } = await userUseCase.follow(targetId);
      if (success) {
        toast.success("Theo dõi người dùng thành công");
        dispatch(updateProfileState({ isFollowing: true }));
        doAfterFollow();
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateProfileState({ isUpdateFollow: false }));
    }
  };

  const unfollow = async (targetId: string, doAfterUnfollow: () => void) => {
    try {
      dispatch(updateProfileState({ isUpdateFollow: true }));
      const { success } = await userUseCase.unfollow(targetId);
      if (success) {
        toast.success("Đã hủy theo dõi người dùng");
        dispatch(updateProfileState({ isFollowing: false }));
        doAfterUnfollow();
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateProfileState({ isUpdateFollow: false }));
    }
  };

  const doAfterClickFollowInProfile = () => {
    dispatch(
      updateUserProfile({
        followersCount: profileUserInfo.followersCount + 1,
      })
    );
  };

  const doAfterClickUnfollowInProfile = () => {
    dispatch(
      updateUserProfile({
        followersCount: profileUserInfo.followersCount - 1,
      })
    );
  };

  const onFollowProfile = () => {
    follow(profileId!, doAfterClickFollowInProfile);
  };

  const onUnfollowProfile = () => {
    unfollow(profileId!, doAfterClickUnfollowInProfile);
  };

  const doAfterClickFollowButtonInPopup = (
    targetId: string,
    isFollowing: boolean
  ) => {
    dispatch(
      updateFollowStatus({ userId: targetId, isFollowing: !isFollowing })
    );
    if (currentUserId === profileId) {
      dispatch(
        updateUserProfile({
          followingCount: isFollowing
            ? profileUserInfo.followingCount - 1
            : profileUserInfo.followingCount + 1,
        })
      );
    }
  };

  const onClickFollowButtonInPopup = (
    targetId: string,
    isFollowing: boolean
  ) => {
    if (isFollowing)
      unfollow(targetId, () =>
        doAfterClickFollowButtonInPopup(targetId, isFollowing)
      );
    else
      follow(targetId, () =>
        doAfterClickFollowButtonInPopup(targetId, isFollowing)
      );
  };

  const getFollowers = async () => {
    if (isLoadingFollowList) return;

    try {
      dispatch(
        updateProfileState({
          isLoadingFollowList: true,
          isOpenFollowPopup: true,
          followListType: "followers",
        })
      );
      const followers = await userUseCase.getFollowers(profileId!);
      dispatch(
        updateProfileState({
          followList: [...followers],
        })
      );
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateProfileState({ isLoadingFollowList: false }));
    }
  };

  const getFollowing = async () => {
    if (isLoadingFollowList) return;

    try {
      dispatch(
        updateProfileState({
          isLoadingFollowList: true,
          isOpenFollowPopup: true,
          followListType: "following",
        })
      );
      const following = await userUseCase.getFollowing(profileId!);
      dispatch(
        updateProfileState({
          followList: [...following],
        })
      );
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateProfileState({ isLoadingFollowList: false }));
    }
  };

  const setOpenFollowPopup = (nextOpen: boolean) => {
    if (!nextOpen) {
      dispatch(reinitFollowPopup());
    } else {
      dispatch(updateProfileState({ isOpenFollowPopup: true }));
    }
  };

  const scrollToNovelSection = () => {
    const element = document.getElementById("novel-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const reinitNovelDetailPageData = () => {
    dispatch(reinitNovelDetailState());
  };

  return {
    goToManageProfilePage,
    getFollowers,
    getFollowing,
    setOpenFollowPopup,
    onFollowProfile,
    onUnfollowProfile,
    onClickFollowButtonInPopup,
    reinitNovelDetailPageData,
    scrollToNovelSection,
  };
};
