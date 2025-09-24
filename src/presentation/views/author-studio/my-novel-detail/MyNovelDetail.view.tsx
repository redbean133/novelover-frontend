import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { H1 } from "@/presentation/components/typography/H1/H1";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/shadcn-ui/components/ui/dropdown-menu";
import { MyNovelDetailViewModel } from "@/presentation/viewmodels/author-studio/my-novel-detail/MyNovelDetail.viewmodel";
import { Ellipsis, TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import { NovelForm } from "../create-novel/NovelForm";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcn-ui/components/ui/dialog";
import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import { UploadImage } from "@/presentation/components/input/UploadImage";
import {
  defaultNovelCoverUrl,
  paginationSizeArray,
  type Sort,
} from "@/shared/constants/constants";
import { MyPagination } from "@/presentation/components/pagination/MyPagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn-ui/components/ui/select";
import { MyChapterItem } from "./MyChapterItem";
import { Helmet } from "react-helmet";

export const MyNovelDetailView = () => {
  const {
    novel,
    isLoading,
    isEditMode,
    isShowPublishedConfirmPopup,
    isShowCompletedConfirmPopup,
    isShowDeleteConfirmPopup,
    isLoadingConfirm,
    isLoadingChapters,
    chapterListData,
    isLoadingCreateNewChapter,
  } = useSelector((state: RootState) => state.myNovels.novelDetail);

  const {
    onChangeEditMode,
    openConfirmCompletedPopup,
    openConfirmDeletePopup,
    openConfirmPublishedPopup,
    onConfirmPublished,
    onConfirmCompleted,
    deleteNovel,
    uploadCover,
    updateChapterListDataState,
    createNewChapter,
    goToEditChapter,
    goToNovelDetailPage,
    chapterListRef,
  } = MyNovelDetailViewModel();

  return (
    <>
      <Helmet>
        <title>{`${novel.title} - Truyện của tôi - Novelover`}</title>
      </Helmet>
      <header className="flex flex-row items-center justify-between">
        <H1>Sửa truyện</H1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="size-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuGroup>
              {novel.isPublished && (
                <DropdownMenuItem onClick={goToNovelDetailPage}>
                  Xem truyện
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  openConfirmPublishedPopup(true);
                }}
              >
                {novel.isPublished ? "Hủy đăng" : "Đăng truyện"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  openConfirmCompletedPopup(true);
                }}
              >
                {novel.isCompleted ? "Tiếp tục viết" : "Kết thúc truyện"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  openConfirmDeletePopup(true);
                }}
              >
                Xóa truyện
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {isLoading ? (
        <LoadingElement className="mt-4" />
      ) : (
        <main className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cover" className="font-semibold">
              Bìa truyện
            </Label>
            {!novel.coverUrl && (
              <p className="text-sm text-muted-foreground">
                * Đang sử dụng bìa truyện mặc định của hệ thống.
              </p>
            )}
            {isEditMode && (
              <UploadImage
                onUploaded={uploadCover}
                aspectRatio={3 / 4}
                initialImageUrl={novel.coverUrl}
                popupTitle="Bìa truyện"
                popupSubTitle="Sau khi lưu ảnh, bìa truyện sẽ được cập nhật trên các trang liên quan."
              ></UploadImage>
            )}
            <img
              src={novel.coverUrl || defaultNovelCoverUrl}
              className="w-30 h-40 object-cover rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            />
          </div>
          <div className="mb-2">
            <Badge
              className={`mr-2 font-semibold ${
                novel.isPublished ? "bg-[#41AB5D] text-white" : ""
              }`}
              variant={novel.isPublished ? "default" : "outline"}
            >
              {novel.isPublished ? "Đã đăng tải" : "Bản thảo"}
            </Badge>
            <Badge
              className={`mr-2 font-semibold ${
                novel.isCompleted ? "bg-[#41AB5D] text-white" : ""
              }`}
              variant={novel.isCompleted ? "default" : "outline"}
            >
              {novel.isCompleted ? "Đã hoàn thành" : "Đang cập nhật"}
            </Badge>
          </div>
          {isEditMode ? (
            <NovelForm />
          ) : (
            <>
              <div>
                <p className="font-semibold text-sm">Tiêu đề</p>
                <p className="text-muted-foreground text-sm">{novel.title}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Tác giả</p>
                {novel.isOriginal ? (
                  <div className="my-1">
                    <Badge className="font-bold" variant="secondary">
                      Tự sáng tác
                    </Badge>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {novel.author.name}
                  </p>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Thể loại</p>
                <div className="my-1">
                  {novel.genres.map((genre) => (
                    <Badge
                      key={`genre-${genre.id}`}
                      className="mr-2 font-bold"
                      variant="secondary"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">Giới thiệu</p>
                <p className="text-muted-foreground text-sm whitespace-pre-line">
                  {novel.description
                    ? novel.description
                    : "Chưa thêm giới thiệu"}
                </p>
              </div>
              <Button
                className="my-1 h-14 rounded-none border-dashed border-gray-400 font-extrabold text-muted-foreground"
                onClick={() => {
                  onChangeEditMode(true);
                }}
                variant="outline"
              >
                CHỈNH SỬA
              </Button>
            </>
          )}
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />
          <div>
            {!novel.isCompleted && (
              <ButtonWithLoading
                className="w-full my-1 h-14 rounded-none border-dashed border-gray-400 font-extrabold text-muted-foreground"
                onClick={createNewChapter}
                variant="outline"
                isLoading={isLoadingCreateNewChapter}
              >
                THÊM CHƯƠNG MỚI
              </ButtonWithLoading>
            )}
            <div className="py-4" ref={chapterListRef}>
              <p className="font-semibold text-sm">Danh sách chương</p>
              {chapterListData.total === 0 ? (
                <p className="font-bold">Chưa thêm chương nào</p>
              ) : (
                <>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-bold">
                      {chapterListData.total} Chương
                    </span>
                    <Select
                      value={chapterListData.sort}
                      onValueChange={(selectedSort: Sort) =>
                        updateChapterListDataState({
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
                  <div className="mb-4">
                    {isLoadingChapters ? (
                      <LoadingElement className="mt-4" />
                    ) : (
                      chapterListData.data.map((chapter) => (
                        <MyChapterItem
                          key={`chapter-${chapter.id}`}
                          chapter={chapter}
                          goToEditChapter={goToEditChapter}
                        />
                      ))
                    )}
                  </div>
                  {chapterListData.total > paginationSizeArray[0] && (
                    <MyPagination
                      totalPages={chapterListData.totalPages}
                      page={chapterListData.page}
                      limit={chapterListData.limit}
                      onChangePage={(page) => {
                        updateChapterListDataState({ page });
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      )}

      {isShowPublishedConfirmPopup && (
        <Dialog
          open={isShowPublishedConfirmPopup}
          onOpenChange={(nextOpen) => openConfirmPublishedPopup(nextOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left">
                {novel.isPublished ? "Hủy đăng truyện" : "Đăng truyện"}
              </DialogTitle>
              <DialogDescription className="text-left">
                {`Sau khi nhấn xác nhận, truyện sẽ ${
                  novel.isPublished ? "không còn" : ""
                } được hiển thị đối với độc giả.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex flex-row gap-2">
                <DialogClose asChild className="flex-1">
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <ButtonWithLoading
                  className="flex-1"
                  type="submit"
                  isLoading={isLoadingConfirm}
                  onClick={onConfirmPublished}
                >
                  Xác nhận
                </ButtonWithLoading>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isShowCompletedConfirmPopup && (
        <Dialog
          open={isShowCompletedConfirmPopup}
          onOpenChange={(nextOpen) => openConfirmCompletedPopup(nextOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left">
                {novel.isCompleted ? "Tiếp tục viết" : "Kết thúc truyện"}
              </DialogTitle>
              <DialogDescription className="text-left">
                {`Sau khi nhấn xác nhận, ${
                  novel.isCompleted
                    ? "truyện sẽ được đánh dấu là chưa hoàn thành"
                    : "truyện sẽ được đánh dấu là đã hoàn thành"
                }.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex flex-row gap-2">
                <DialogClose asChild className="flex-1">
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <ButtonWithLoading
                  className="flex-1"
                  type="submit"
                  isLoading={isLoadingConfirm}
                  onClick={onConfirmCompleted}
                >
                  Xác nhận
                </ButtonWithLoading>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isShowDeleteConfirmPopup && (
        <Dialog
          open={isShowDeleteConfirmPopup}
          onOpenChange={(nextOpen) => openConfirmDeletePopup(nextOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left">Xóa truyện</DialogTitle>
              <DialogDescription className="text-left">
                Sau khi nhấn xác nhận, truyện sẽ bị xóa khỏi cơ sở dữ liệu.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex flex-row gap-2">
                <DialogClose asChild className="flex-1">
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <ButtonWithLoading
                  className="flex-1 opacity-75"
                  type="submit"
                  isLoading={isLoadingConfirm}
                  onClick={deleteNovel}
                  variant="destructive"
                >
                  <TriangleAlert />
                  Xác nhận
                </ButtonWithLoading>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
