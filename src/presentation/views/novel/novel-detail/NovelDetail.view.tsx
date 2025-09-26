import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { MyPagination } from "@/presentation/components/pagination/MyPagination";
import type { RootState } from "@/presentation/redux/store";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/shadcn-ui/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn-ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/presentation/shadcn-ui/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/shadcn-ui/components/ui/tabs";
import { NovelDetailViewModel } from "@/presentation/viewmodels/novel/novel-detail/NovelDetail.viewmodel";
import {
  defaultNovelCoverUrl,
  formatNumber,
  type Sort,
} from "@/shared/constants/constants";
import {
  Bookmark,
  ChevronsRight,
  Ellipsis,
  Eye,
  Heart,
  Star,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NovelDetailView = () => {
  const { isLoadingNovel, novel, tab, isLoadingChapters, chapterListData } =
    useSelector((state: RootState) => state.novelDetail);
  const isLoggedIn = !!useSelector((state: RootState) => state.user.current.id);
  const currentUserId = useSelector(
    (state: RootState) => state.user.current.id
  );
  const { onChangeTab, goToMyNovelDetailPage, updateChapterListData } =
    NovelDetailViewModel();
  return (
    <>
      <Helmet>
        <title>{`${novel.title} - Novelover`}</title>
      </Helmet>
      {isLoadingNovel ? (
        <div className="flex justify-center items-center min-h-svh">
          <Spinner variant="circle-filled" />
        </div>
      ) : (
        <>
          {isLoggedIn && (
            <header className="flex flex-row items-center justify-between mb-6">
              <Button variant="secondary" size="icon" className="size-8">
                <Bookmark />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="size-8">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36" align="end">
                  {novel.contributorId === currentUserId && (
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={goToMyNovelDetailPage}>
                        Chỉnh sửa
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  )}
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
          )}
          <main className="flex flex-col">
            <section id="novel-overview" className="flex flex-col gap-2 mb-6">
              <div className="w-48 relative mx-auto overflow-hidden">
                <img
                  src={novel.coverUrl || defaultNovelCoverUrl}
                  className="w-full h-full object-cover rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                />
                {novel.isOriginal && (
                  <div className="absolute top-3 -left-10 w-32 transform -rotate-45 opacity-75">
                    <div className="bg-indigo-500 text-white text-center text-xs font-bold py-1 shadow-md">
                      Sáng tác
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {novel.isOriginal ? novel.contributorName : novel.author.name}
              </p>
              <p className="text-xl font-bold text-center">{novel.title}</p>
              <div className="text-sm text-muted-foreground flex gap-3 mx-auto">
                {novel.averageRating !== "0.00" && (
                  <span className="flex gap-1 items-center">
                    <Star
                      className="size-[1em]"
                      color="#FFC107"
                      fill="#FFC107"
                    />
                    {novel.averageRating}
                  </span>
                )}
                {novel.numberOfVotes !== 0 && (
                  <span className="flex gap-1 items-center">
                    <Heart
                      className="size-[1em]"
                      color="#F75270"
                      fill="#F75270"
                    />
                    {formatNumber(novel.numberOfVotes, { short: true })}
                  </span>
                )}
                {novel.numberOfViews !== 0 && (
                  <span className="flex gap-1 items-center">
                    <Eye className="size-[1em]" />
                    {formatNumber(novel.numberOfViews, { short: true })}
                  </span>
                )}
                <p className="text-sm text-indigo-400">
                  {`${formatNumber(novel.numberOfPublishedChapters)} Chương`}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {novel.isCompleted && (
                  <Badge className="bg-[#41AB5D] text-white font-semibold">
                    Đã hoàn thành
                  </Badge>
                )}
                {novel.genres.map((genre) => (
                  <Badge
                    key={`genre-${genre.id}`}
                    className="bg-[#DBE3FF] text-[#88A4E8] font-semibold"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </section>
            <section id="action" className="flex gap-2 mb-3">
              <Button variant="outline">
                Đọc truyện
                <ChevronsRight />
              </Button>
              {/* <Button variant="outline">AI tóm tắt</Button> */}
            </section>
            <section id="novel-details">
              <Tabs
                value={tab}
                onValueChange={(tabName) =>
                  onChangeTab(
                    tabName as unknown as "description" | "reviews" | "chapters"
                  )
                }
              >
                <TabsList className="flex w-full p-0 bg-white ">
                  <TabsTrigger
                    value="description"
                    className="flex-1 rounded-sm font-semibold"
                  >
                    Giới thiệu
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="flex-1 rounded-sm font-semibold"
                  >
                    Đánh giá
                  </TabsTrigger>
                  <TabsTrigger
                    id="chapters-tab"
                    value="chapters"
                    className="flex-1 rounded-sm font-semibold"
                  >
                    Danh sách chương
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <div className="rounded-sm py-2 px-3 bg-accent">
                    <p className="whitespace-pre-line">{novel.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="chapters">
                  {isLoadingChapters ? (
                    <div className="h-12 flex items-center justify-center">
                      <LoadingElement />
                    </div>
                  ) : (
                    <div className="p-4 border rounded-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="font-bold">
                          {chapterListData.total} Chương
                        </span>
                        <Select
                          value={chapterListData.sort}
                          onValueChange={(selectedSort: Sort) =>
                            updateChapterListData({
                              sort: selectedSort,
                              page: 1,
                            })
                          }
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Sắp xếp" />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectGroup>
                              <SelectLabel>Thời gian tạo</SelectLabel>
                              <SelectItem value="ASC">Cũ nhất</SelectItem>
                              <SelectItem value="DESC">Mới nhất</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <Table className="table-fixed w-full">
                        <TableBody>
                          {chapterListData.data.map((chapter) => (
                            <TableRow key={chapter.id}>
                              <TableCell className="px-0">
                                <Link
                                  to={`/chapters/${chapter.id}`}
                                  className="block w-full truncate font-semibold"
                                >
                                  {chapter.title}
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {chapterListData.totalPages > 1 && (
                        <MyPagination
                          totalPages={chapterListData.totalPages}
                          page={chapterListData.page}
                          limit={chapterListData.limit}
                          onChangePage={(page) => {
                            updateChapterListData({ page });
                          }}
                        />
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </section>
          </main>
        </>
      )}
    </>
  );
};
