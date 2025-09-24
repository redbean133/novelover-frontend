import { createBrowserRouter } from "react-router-dom";
import HomeView from "../views/home/Home.view";
import LoginView from "../views/login/Login.view";
import { Root } from "./Root";
import { OnlyGuestRoute } from "./OnlyGuest.route";
import { RegisterView } from "../views/register/Register.view";
import { ProfileView } from "../views/profile/Profile.view";
import { ManageProfileView } from "../views/manage-profile/ManageProfile.view";
import { VerifyEmailView } from "../views/manage-profile/VerifyEmail.view";
import { OnlyUserLoginRoute } from "./OnlyUserLogin.route";
import { AuthorStudioView } from "../views/author-studio/AuthorStudio.view";
import { LibraryView } from "../views/library/Library.view";
import { SearchNovelView } from "../views/novel/SearchNovel.view";
import { CreateNovelView } from "../views/author-studio/create-novel/CreateNovel.view";
import { MyNovelDetailView } from "../views/author-studio/my-novel-detail/MyNovelDetail.view";
import { ChapterFormView } from "../views/chapter-form/ChapterForm.view";
import { NovelDetailView } from "../views/novel/novel-detail/NovelDetail.view";
import { ChapterDetailView } from "../views/novel/chapter-detail/ChapterDetail.view";

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
        element: <OnlyUserLoginRoute />,
        children: [
          {
            path: "/my-novels",
            element: <AuthorStudioView />,
          },
          {
            path: "/my-novels/create",
            element: <CreateNovelView />,
          },
          {
            path: "/my-novels/:id",
            element: <MyNovelDetailView />,
          },
          {
            path: "/my-library",
            element: <LibraryView />,
          },
          {
            path: "/chapters/:id/edit",
            element: <ChapterFormView />,
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
      {
        path: "/novels",
        element: <SearchNovelView />,
      },
      {
        path: "/novels/:id",
        element: <NovelDetailView />,
      },
      {
        path: "/chapters/:id",
        element: <ChapterDetailView />,
      },
    ],
  },
]);
