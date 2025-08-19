import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { reinitCurrentUser } from "@/presentation/redux/slices/user.slice";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeView = () => {
  const dispatch = useDispatch();
  const userUseCase = UserUseCase(new UserRepositoryImpl());
  const username = useSelector(
    (state: RootState) => state.user.current.username
  );

  const handleLogout = async () => {
    try {
      await userUseCase.logout();
      dispatch(reinitCurrentUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      Home {username}
      <Button onClick={handleLogout}>Logout</Button>
      <Link to="/login">To Login</Link>
    </div>
  );
};

export default HomeView;
