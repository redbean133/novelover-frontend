import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { updateCurrentUser } from "../redux/slices/user.slice";
import { decodeJwt } from "@/shared/utils/helpers";
import { Toaster } from "react-hot-toast";

export const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUseCase = UserUseCase(new UserRepositoryImpl());

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const now = new Date().getTime();
        if (
          accessToken &&
          accessTokenExpiry &&
          now < parseInt(accessTokenExpiry) * 1000
        ) {
          const decodeToken = decodeJwt(accessToken);
          const currentUserInfo = await userUseCase.getUserInformation(
            decodeToken.sub
          );
          dispatch(updateCurrentUser(currentUserInfo));
        }
      } catch (error) {
        console.error("Failed to authentication:", error);
        navigate("/login");
      }
    };

    checkAccessToken();
  }, [accessToken]);

  return (
    <>
      <Outlet />
      <Toaster position="bottom-center" />
    </>
  );
};
