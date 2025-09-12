import { Home, Search, User, BookHeart, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/presentation/redux/store";

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string | ((userId: string) => string);
  requireAuth?: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: "Home", icon: <Home size={22} />, path: "/" },
  {
    label: "Library",
    icon: <BookHeart size={22} />,
    path: (userId: string) => `/libraries/${userId}`,
    requireAuth: true,
  },
  { label: "Search", icon: <Search size={22} />, path: "/novels" },
  {
    label: "Write",
    icon: <SquarePen size={22} />,
    path: (userId: string) => `/users/${userId}/novels`,
    requireAuth: true,
  },
  {
    label: "Profile",
    icon: <User size={22} />,
    path: (userId: string) => (userId ? `/users/${userId}` : "/login"),
  },
];

export const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );
  const isLoggedIn = Boolean(currentUserId);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-2">
      <div className="flex justify-around items-center h-12 gap-2">
        {navigationItems
          .filter((item) => !item.requireAuth || isLoggedIn)
          .map((item) => {
            const path =
              typeof item.path === "function"
                ? item.path(currentUserId!)
                : item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(path)}
                className={`flex-1 flex justify-center items-center ${"text-gray-600 hover:text-gray-900"}`}
              >
                {item.icon}
              </button>
            );
          })}
      </div>
    </nav>
  );
};
