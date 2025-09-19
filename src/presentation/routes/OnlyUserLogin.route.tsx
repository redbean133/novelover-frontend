import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const OnlyUserLoginRoute = () => {
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.user.current.id
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
