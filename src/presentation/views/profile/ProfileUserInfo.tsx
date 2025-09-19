import type { RootState } from "@/presentation/redux/store";
import { useSelector } from "react-redux";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  defaultAvatarUrl,
  defaultCoverUrl,
  formatDate,
  formatNumber,
  Gender,
} from "@/shared/constants/constants";
import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";
import { Plus } from "lucide-react";

interface IProfileUserInfoProps {
  goToManageProfilePage: () => void;
  follow: () => void;
  unfollow: () => void;
  getFollowers: () => void;
  getFollowing: () => void;
}

export const ProfileUserInfo = ({
  goToManageProfilePage,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
}: IProfileUserInfoProps) => {
  const {
    coverUrl,
    avatarUrl,
    displayName,
    username,
    about,
    gender,
    birthday,
    createdAt,
    followersCount = 1100000,
    followingCount = 2200,
  } = useSelector((state: RootState) => state.profile.user);
  const { isMyProfile, isFollowing, isUpdateFollow } = useSelector(
    (state: RootState) => state.profile
  );
  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.current
  );

  const onClickFollowButton = () => {
    if (isFollowing) unfollow();
    else follow();
  };

  return (
    <section>
      <div
        className="aspect-[2/1] bg-cover bg-center"
        style={{ backgroundImage: `url(${coverUrl || defaultCoverUrl})` }}
      />

      <div className="-mt-16 flex flex-col gap-2">
        <div className="flex justify-center">
          <img
            src={avatarUrl || defaultAvatarUrl}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-center">{displayName}</h1>
          <p className="text-sm text-muted-foreground text-center">
            @{username}
          </p>
        </div>
        {isMyProfile ? (
          <Button variant="outline" onClick={goToManageProfilePage}>
            Quản lý thông tin
          </Button>
        ) : (
          currentUserId && (
            <ButtonWithLoading
              variant="outline"
              onClick={onClickFollowButton}
              isLoading={isUpdateFollow}
            >
              {isFollowing ? (
                <>Đang theo dõi</>
              ) : (
                <>
                  <Plus />
                  Theo dõi
                </>
              )}
            </ButtonWithLoading>
          )
        )}
        <div className="py-4 flex text-sm border-b-2 justify-center">
          <div className="flex gap-3 px-4 border-r-2">
            <span className="font-semibold">{formatNumber(1100)}</span>
            <span className="text-muted-foreground">Tác phẩm</span>
          </div>
          <div
            className="flex gap-3 px-4 border-r-2 select-none"
            onClick={() => {
              if (followersCount > 0) getFollowers();
            }}
          >
            <span className="font-semibold">
              {formatNumber(followersCount)}
            </span>
            <span className="text-muted-foreground">Người theo dõi</span>
          </div>
          <div
            className="flex gap-3 px-4 select-none"
            onClick={() => {
              if (followingCount > 0) getFollowing();
            }}
          >
            <span className="font-semibold">
              {formatNumber(followingCount)}
            </span>
            <span className="text-muted-foreground">Đang theo dõi</span>
          </div>
        </div>
      </div>

      <div className="py-4 flex flex-col ">
        {about && <p className="text-sm mb-2 whitespace-pre-line">{about}</p>}
        <div className="text-xs text-muted-foreground mb-1  ">
          {gender !== Gender.Unknown && (
            <span>
              Giới tính {gender === Gender.Female ? "nữ" : "nam"}{" "}
              {birthday ? " - " : ""}
            </span>
          )}
          {birthday && <span>Sinh ngày {formatDate(birthday)}</span>}
        </div>
        {createdAt && (
          <p className="text-xs text-muted-foreground">
            Gia nhập vào {formatDate(createdAt)}
          </p>
        )}
      </div>
    </section>
  );
};
