import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { reinitCurrentUser } from "@/presentation/redux/slices/user.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomeViewModel = () => {
  const userUseCase = UserUseCase(new UserRepositoryImpl());
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickLoginButton = () => {
    navigate("/login");
  };

  const onClickViewProfile = () => {
    navigate(`/users/${currentUserId}`);
  };

  const onClickManageProfile = () => {
    navigate(`/users/${currentUserId}/manage`);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await userUseCase.logout();
      dispatch(reinitCurrentUser());
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    }
  };

  return {
    onClickLoginButton,
    onClickViewProfile,
    onClickManageProfile,
    handleLogout,
    goToHomePage,
  };
};
