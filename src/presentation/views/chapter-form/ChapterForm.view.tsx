import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { H1 } from "@/presentation/components/typography/H1/H1";
import type { RootState } from "@/presentation/redux/store";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcn-ui/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/shadcn-ui/components/ui/dropdown-menu";
import { Textarea } from "@/presentation/shadcn-ui/components/ui/textarea";
import { ChapterFormViewModel } from "@/presentation/viewmodels/chapter-form/ChapterForm.viewmodel";
import { Baseline, Ellipsis, TriangleAlert } from "lucide-react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export const ChapterFormView = () => {
  const {
    isLoadingChapterDetail,
    isLoadingSaveData,
    chapter,
    isShowPublishedConfirmPopup,
    isShowDeleteConfirmPopup,
    isLoadingConfirm,
    inputTitle,
    inputContent,
    numberOfWords,
  } = useSelector((state: RootState) => state.myNovels.chapterDetail);

  const {
    updateChapterDetailDataState,
    updateChapter,
    openConfirmPublishedPopup,
    openConfirmDeletePopup,
    onConfirmPublished,
    deleteChapter,
  } = ChapterFormViewModel();

  return (
    <>
      <Helmet>
        <title>{`${chapter.title} - Viết truyện - Novelover`}</title>
      </Helmet>
      <header className="flex items-center justify-between gap-6">
        <H1 className="flex-1 min-w-0 truncate block overflow-hidden">
          Viết truyện
        </H1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="size-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  openConfirmPublishedPopup(true);
                }}
              >
                {chapter.isPublished ? "Hủy đăng" : "Đăng chương"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  openConfirmDeletePopup(true);
                }}
              >
                Xóa chương
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {isLoadingChapterDetail ? (
        <LoadingElement className="mt-4" />
      ) : (
        <main className="flex flex-col gap-2 mt-6 pb-24">
          <input
            id="title"
            type="text"
            value={inputTitle}
            placeholder="Nhập tiêu đề chương..."
            className="py-1 border-b-2 focus:outline-none focus:ring-0"
            onChange={(e) =>
              updateChapterDetailDataState({ inputTitle: e.target.value })
            }
          />
          <Textarea
            id="content"
            className="h-auto px-0 border-none !border-0 !ring-0 !outline-none focus:!ring-0 focus:!outline-none focus:!border-0 shadow-none"
            value={inputContent}
            placeholder="Nhấp vào đây để bắt đầu viết..."
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              updateChapterDetailDataState({
                inputContent: event.target.value,
              });
            }}
          />
          <div className="fixed bottom-12 left-0 right-0 bg-white px-5 pt-2 pb-4 flex items-center justify-between z-40">
            <div className="flex gap-2">
              <span className="flex gap-1 items-center text-muted-foreground">
                <Baseline className="size-[1em]" />
                {`${numberOfWords} từ`}
              </span>
              {chapter.isPublished ? (
                <Badge className="bg-[#41AB5D] text-white">Đã đăng</Badge>
              ) : (
                <Badge variant="secondary">Bản thảo</Badge>
              )}
            </div>
            <ButtonWithLoading
              isLoading={isLoadingSaveData}
              className="w-34"
              onClick={updateChapter}
            >
              Lưu chương
            </ButtonWithLoading>
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
                {chapter.isPublished ? "Hủy đăng chương" : "Đăng chương"}
              </DialogTitle>
              <DialogDescription className="text-left">
                {`Trong trường hợp truyện đã được đăng tải, sau khi nhấn xác nhận, chương truyện sẽ ${
                  chapter.isPublished ? "không còn" : ""
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

      {isShowDeleteConfirmPopup && (
        <Dialog
          open={isShowDeleteConfirmPopup}
          onOpenChange={(nextOpen) => openConfirmDeletePopup(nextOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left">Xóa chương truyện</DialogTitle>
              <DialogDescription className="text-left">
                Sau khi nhấn xác nhận, chương truyện sẽ bị xóa khỏi cơ sở dữ
                liệu.
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
                  onClick={deleteChapter}
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
