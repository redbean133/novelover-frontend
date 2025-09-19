import { ProfileViewModel } from "@/presentation/viewmodels/profile/Profile.viewmodel";
import { ProfileUserInfo } from "./ProfileUserInfo";
import { useSelector } from "react-redux";
import type { RootState } from "@/presentation/redux/store";
import { UserListPopup } from "@/presentation/components/user/UserListPopup";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";

export const ProfileView = () => {
  const {
    isLoadingProfile,
    isOpenFollowPopup,
    isLoadingFollowList,
    followList,
    followListType,
    user,
  } = useSelector((state: RootState) => state.profile);
  const {
    goToManageProfilePage,
    getFollowers,
    getFollowing,
    setOpenFollowPopup,
    onFollowProfile,
    onUnfollowProfile,
    onClickFollowButtonInPopup,
  } = ProfileViewModel();
  return (
    <>
      {isLoadingProfile ? (
        <LoadingElement />
      ) : (
        <ProfileUserInfo
          goToManageProfilePage={goToManageProfilePage}
          follow={onFollowProfile}
          unfollow={onUnfollowProfile}
          getFollowers={getFollowers}
          getFollowing={getFollowing}
        />
      )}
      {isOpenFollowPopup && (
        <UserListPopup
          isOpen={isOpenFollowPopup}
          setOpen={setOpenFollowPopup}
          isLoading={isLoadingFollowList}
          users={followList}
          title={
            followListType === "followers" ? "Người theo dõi" : "Đang theo dõi"
          }
          subTitle={
            followListType === "followers"
              ? `Danh sách người dùng đang theo dõi ${user.displayName}.`
              : `Danh sách ${user.displayName} đang theo dõi.`
          }
          onClickFollowButton={onClickFollowButtonInPopup}
        />
      )}
    </>
  );
};
