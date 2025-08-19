import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { UserRole } from "@/shared/constants/constants";

export const AdminRoute = () => {
  const currentUserRole = useSelector(
    (state: RootState) => state.user.current.role
  );

  if (currentUserRole !== UserRole.Admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
