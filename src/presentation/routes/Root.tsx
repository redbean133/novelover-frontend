import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { updateCurrentUser } from "../redux/slices/user.slice";
import { decodeJwt } from "@/shared/utils/helpers";
import { Toaster } from "react-hot-toast";
import type { RootState } from "../redux/store";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const userUseCase = UserUseCase(new UserRepositoryImpl());

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        setIsLoading(true);
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
          dispatch(updateCurrentUser({ ...currentUserInfo }));
        }
      } catch (error) {
        console.error("Failed to authentication:", error);
        if (accessToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("accessTokenExpiry");
        }
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccessToken();
  }, [accessToken, currentUserId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-svh">
        <Spinner variant="circle-filled" />
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-svh">
      <div className="w-full max-w-xs pt-8 pb-4">
        <Outlet />
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};
