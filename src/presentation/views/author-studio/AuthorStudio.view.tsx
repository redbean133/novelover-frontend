import { H1 } from "@/presentation/components/typography/H1/H1";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/presentation/shadcn-ui/components/ui/tabs";
import { AuthorStudioViewModel } from "@/presentation/viewmodels/author-studio/AuthorStudio.viewmodel";
import { BookOpenCheck, BookDashed, ListPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { MyNovelCard } from "./MyNovelCard";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { useMemo } from "react";
import {
  formatNumber,
  paginationSizeArray,
} from "@/shared/constants/constants";
import { MyPagination } from "@/presentation/components/pagination/MyPagination";

export const AuthorStudioView = () => {
  const {
    onChangeTab,
    onChangePage,
    onChangeLimit,
    handleClickCreateNovel,
    handleClickNewChapter,
    handleClickLinkToDetail,
  } = AuthorStudioViewModel();
  const { novels, isLoading, tab } = useSelector(
    (state: RootState) => state.myNovels
  );

  const novelList = useMemo(() => {
    return (
      <>
        <p className="font-bold truncate mb-2">
          {novels.total > 0
            ? `${formatNumber(novels.total)} Tác phẩm`
            : `Bạn chưa thêm tác phẩm nào!`}
        </p>
        {novels.data.map((novel) => (
          <MyNovelCard
            novel={novel}
            key={`novel-${novel.id}`}
            handleClickNewChapter={handleClickNewChapter}
            handleClickLinkToDetail={handleClickLinkToDetail}
          />
        ))}
        {novels.total > paginationSizeArray[0] && (
          <MyPagination
            page={novels.page}
            totalPages={novels.totalPages}
            onChangePage={onChangePage}
            limit={novels.limit}
            onChangeLimit={onChangeLimit}
          />
        )}
      </>
    );
  }, [novels]);

  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <H1>Tác phẩm</H1>{" "}
        <Button variant="outline" size="sm" onClick={handleClickCreateNovel}>
          <ListPlus />
          Truyện mới
        </Button>
      </header>
      <main className="mt-6">
        <Tabs
          value={tab}
          onValueChange={(value) =>
            onChangeTab(value as unknown as "published" | "draft")
          }
        >
          <TabsList className="flex w-full h-12 p-1 bg-white rounded-sm border-1 mb-2">
            <TabsTrigger
              value="published"
              className="flex-1 rounded-sm font-semibold"
            >
              <BookOpenCheck />
              Đã đăng tải
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="flex-1 rounded-sm font-semibold"
            >
              <BookDashed />
              Bản thảo
            </TabsTrigger>
          </TabsList>
          {isLoading ? <LoadingElement /> : novelList}
        </Tabs>
      </main>
    </>
  );
};
