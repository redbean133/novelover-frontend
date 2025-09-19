import { Home, Search, User, BookHeart, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/presentation/redux/store";
import { useMemo } from "react";
import { reinitMyNovelsState } from "@/presentation/redux/slices/myNovels.slice";

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  requireAuth?: boolean;
}

export const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );
  const isLoggedIn = Boolean(currentUserId);
  const dispatch = useDispatch();

  const navigationItems: NavigationItem[] = useMemo(() => {
    return [
      {
        label: "Home",
        icon: <Home size={22} />,
        onClick: () => {
          navigate(`/`);
        },
      },
      {
        label: "Library",
        icon: <BookHeart size={22} />,
        onClick: () => {
          navigate(`/my-library`);
        },
        requireAuth: true,
      },
      {
        label: "Search",
        icon: <Search size={22} />,
        onClick: () => {
          navigate(`/novels`);
        },
      },
      {
        label: "Author studio",
        icon: <SquarePen size={22} />,
        onClick: () => {
          dispatch(reinitMyNovelsState());
          navigate(`/my-novels`);
        },
        requireAuth: true,
      },
      {
        label: "Profile",
        icon: <User size={22} />,
        onClick: () => {
          navigate(currentUserId ? `/users/${currentUserId}` : "/login");
        },
      },
    ];
  }, [currentUserId, navigate, dispatch]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-2">
      <div className="flex justify-around items-center h-12 gap-2">
        {navigationItems
          .filter((item) => !item.requireAuth || isLoggedIn)
          .map((item) => {
            return (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                }}
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
