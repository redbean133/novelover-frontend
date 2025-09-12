import { createBrowserRouter } from "react-router-dom";
import HomeView from "../views/home/Home.view";
import LoginView from "../views/login/Login.view";
import { Root } from "./Root";
import { OnlyGuestRoute } from "./OnlyGuest.route";
import { RegisterView } from "../views/register/Register.view";
import { ProfileView } from "../views/profile/Profile.view";
import { ManageProfileView } from "../views/manage-profile/ManageProfile.view";
import { VerifyEmailView } from "../views/manage-profile/VerifyEmail.view";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        element: <OnlyGuestRoute />,
        children: [
          {
            path: "/login",
            element: <LoginView />,
          },
          {
            path: "/register",
            element: <RegisterView />,
          },
        ],
      },
      {
        path: "/users/:id",
        element: <ProfileView />,
      },
      {
        path: "users/:id/manage",
        element: <ManageProfileView />,
      },
      {
        path: "email-verify",
        element: <VerifyEmailView />,
      },
    ],
  },
]);
