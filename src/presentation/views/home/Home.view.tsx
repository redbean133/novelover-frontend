import type { RootState } from "@/presentation/redux/store";
import { useSelector } from "react-redux";
import { H1 } from "@/presentation/components/typography/H1/H1";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { HomeViewModel } from "@/presentation/viewmodels/home/Home.viewmodel";
import { Helmet } from "react-helmet";

const HomeView = () => {
  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.current
  );

  const { onClickLoginButton } = HomeViewModel();

  return (
    <>
      <Helmet>
        <title>Kho tàng tiểu thuyết hay nhất - Novelover</title>
      </Helmet>
      <header className="flex flex-row items-center justify-between">
        <H1>Novelover</H1>
        {!currentUserId && (
          <Button variant="secondary" onClick={onClickLoginButton}>
            Đăng nhập
          </Button>
        )}
      </header>
    </>
  );
};

export default HomeView;
