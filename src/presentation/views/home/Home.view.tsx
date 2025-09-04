import type { RootState } from "@/presentation/redux/store";
import { useSelector } from "react-redux";
import menuIcon from "@/assets/icon/menuIcon.svg";
import { H1 } from "@/presentation/components/typography/H1/H1";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { HomeViewModel } from "@/presentation/viewmodels/home/Home.viewmodel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/shadcn-ui/components/ui/dropdown-menu";

const HomeView = () => {
  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.current
  );

  const {
    onClickLoginButton,
    onClickViewProfile,
    onClickManageProfile,
    handleLogout,
    goToHomePage,
  } = HomeViewModel();

  return (
    <header className="flex flex-row items-center justify-between">
      <H1 onClick={goToHomePage}>Novelover</H1>
      {currentUserId ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="size-8">
              <img src={menuIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onClickViewProfile}>
                Trang cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClickManageProfile}>
                Quản lý thông tin
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="secondary" onClick={onClickLoginButton}>
          Đăng nhập
        </Button>
      )}
    </header>
  );
};

export default HomeView;
