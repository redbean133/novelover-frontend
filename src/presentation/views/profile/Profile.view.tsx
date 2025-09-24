import { ProfileViewModel } from "@/presentation/viewmodels/profile/Profile.viewmodel";
import { ProfileUserInfo } from "./ProfileUserInfo";
import { useSelector } from "react-redux";
import type { RootState } from "@/presentation/redux/store";
import { UserListPopup } from "@/presentation/components/user/UserListPopup";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { NovelDetailCard } from "@/presentation/components/novel/NovelDetailCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/presentation/shadcn-ui/components/ui/carousel";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const ProfileView = () => {
  const {
    isLoadingProfile,
    isOpenFollowPopup,
    isLoadingFollowList,
    followList,
    followListType,
    user,
    novels,
  } = useSelector((state: RootState) => state.profile);
  const {
    goToManageProfilePage,
    scrollToNovelSection,
    getFollowers,
    getFollowing,
    setOpenFollowPopup,
    onFollowProfile,
    onUnfollowProfile,
    onClickFollowButtonInPopup,
    reinitNovelDetailPageData,
  } = ProfileViewModel();
  return (
    <>
      <Helmet>
        <title>{`${user.displayName} - Hồ sơ người dùng - Novelover`}</title>
      </Helmet>
      {isLoadingProfile ? (
        <LoadingElement />
      ) : (
        <main>
          <ProfileUserInfo
            goToManageProfilePage={goToManageProfilePage}
            scrollToNovelSection={scrollToNovelSection}
            follow={onFollowProfile}
            unfollow={onUnfollowProfile}
            getFollowers={getFollowers}
            getFollowing={getFollowing}
          />
          <div id="novel-section" className="my-2">
            <Link to="#" className="select-none cursor-pointer w-fit">
              <p className="font-bold">Tác phẩm</p>
              <p className="text-xs text-muted-foreground">
                {novels.total} Truyện đã đăng
              </p>
            </Link>
          </div>
          {novels.total > 0 && (
            <Carousel>
              <CarouselContent>
                {novels.data.map((novel) => (
                  <CarouselItem key={`novel-${novel.id}`}>
                    <NovelDetailCard
                      novel={novel}
                      handleClickLinkToDetail={reinitNovelDetailPageData}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </main>
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
