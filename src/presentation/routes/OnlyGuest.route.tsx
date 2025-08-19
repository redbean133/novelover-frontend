import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const OnlyGuestRoute = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );

  if (currentUserId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
