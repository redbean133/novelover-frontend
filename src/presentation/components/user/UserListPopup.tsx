import type { UserInfoInFollow } from "@/domain/entities/follow.entity";
import type { RootState } from "@/presentation/redux/store";
import {
  Avatar,
  AvatarImage,
} from "@/presentation/shadcn-ui/components/ui/avatar";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcn-ui/components/ui/dialog";
import { defaultAvatarUrl } from "@/shared/constants/constants";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { LoadingElement } from "../loading/LoadingElement";

interface IUserItemInPopup {
  user: UserInfoInFollow;
  onClickFollowButton: (targetId: string, isFollowing: boolean) => void;
}

export const UserItemInPopup = ({
  user,
  onClickFollowButton,
}: IUserItemInPopup) => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );

  return (
    <div className="flex items-center justify-between text-sm py-2 border-y-1">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={user.avatarUrl || defaultAvatarUrl} />
        </Avatar>
        <div>
          <p>{user.displayName}</p>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
      {currentUserId && currentUserId !== user.id && (
        <Button
          variant={user.isFollowing ? "outline" : "default"}
          onClick={() => {
            onClickFollowButton(user.id, user.isFollowing);
          }}
        >
          {user.isFollowing ? "Đang theo dõi" : "Theo dõi"}
        </Button>
      )}
    </div>
  );
};

interface IUserListPopupProps {
  isOpen: boolean;
  setOpen: (nextOpen: boolean) => void;
  title: string;
  subTitle?: string;
  isLoading: boolean;
  users: UserInfoInFollow[];
  onClickFollowButton: (targetId: string, isFollowing: boolean) => void;
}

export const UserListPopup = ({
  isOpen,
  setOpen,
  title,
  subTitle,
  isLoading,
  users,
  onClickFollowButton,
}: IUserListPopupProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">{title}</DialogTitle>
            {subTitle && (
              <DialogDescription className="text-left">
                {subTitle}
              </DialogDescription>
            )}
          </DialogHeader>
          {isLoading ? (
            <LoadingElement />
          ) : isEmpty(users) ? (
            <div>Danh sách trống</div>
          ) : (
            <div>
              {users.map((user) => (
                <UserItemInPopup
                  key={user.id}
                  user={user}
                  onClickFollowButton={onClickFollowButton}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
