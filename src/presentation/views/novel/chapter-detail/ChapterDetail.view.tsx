import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/presentation/shadcn-ui/components/ui/dialog";
import { ScrollArea } from "@/presentation/shadcn-ui/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/presentation/shadcn-ui/components/ui/table";
import { ChapterDetailViewModel } from "@/presentation/viewmodels/novel/chapter-detail/ChapterDetail.viewmodel";
import { formatDate, formatNumber } from "@/shared/constants/constants";
import {
  Baseline,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Eye,
  Heart,
} from "lucide-react";
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ChapterDetailView = () => {
  const {
    isLoadingChapter,
    chapter,
    isShowChapterListPopup,
    isLoadingChapterList,
    chapterList,
    isLoadingAudio,
  } = useSelector((state: RootState) => state.chapterDetail);
  const {
    backToNovelDetailPage,
    handleChangeChapter,
    handleViewChapterList,
    changeOpenChapterListPopup,
    findAudio,
  } = ChapterDetailViewModel();
  const isLoggedIn = !!useSelector((state: RootState) => state.user.current.id);

  const chapterNavigator = useMemo(() => {
    return (
      <div className="w-full flex justify-between mt-2 mb-6 gap-2">
        <Button
          disabled={!chapter.prevChapterId}
          onClick={() => handleChangeChapter(chapter.prevChapterId)}
        >
          <ChevronsLeft /> Trước
        </Button>
        <ButtonWithLoading
          variant="outline"
          className="flex flex-1 overflow-hidden"
          onClick={handleViewChapterList}
          isLoading={isLoadingChapterList}
        >
          <span className="flex-1 truncate">{chapter.title}</span>
          <ChevronsUpDown />
        </ButtonWithLoading>
        <Button
          disabled={!chapter.nextChapterId}
          onClick={() => handleChangeChapter(chapter.nextChapterId)}
        >
          Sau <ChevronsRight />
        </Button>
      </div>
    );
  }, [
    chapter,
    isLoadingChapterList,
    handleChangeChapter,
    handleViewChapterList,
  ]);

  return (
    <>
      <Helmet>
        <title>{`${chapter.title} - ${chapter.novelTitle} - Novelover`}</title>
      </Helmet>
      {isLoadingChapter ? (
        <>
          <div className="flex justify-center items-center min-h-svh">
            <Spinner variant="circle-filled" />
          </div>
        </>
      ) : (
        <>
          <header className="flex flex-row items-center justify-between">
            <Button
              variant="secondary"
              size="icon"
              className="size-8"
              onClick={backToNovelDetailPage}
            >
              <ChevronsLeft />
            </Button>
            {isLoggedIn && (
              <Button variant="secondary" size="icon" className="size-8">
                <Heart />
              </Button>
            )}
          </header>
          <main className="mt-6">
            <p className="font-bold">{chapter.novelTitle}</p>
            {chapterNavigator}
            <p className="text-xl font-bold">{chapter.title}</p>
            {!!chapter.audioUrl &&
            chapter.audioVersion === chapter.contentVersion ? (
              <audio controls className="w-full my-2">
                <source src={chapter.audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <ButtonWithLoading
                isLoading={isLoadingAudio}
                className="w-full my-2 h-[54px]"
                variant="outline"
                onClick={findAudio}
              >
                Tải audio chương truyện
              </ButtonWithLoading>
            )}
            <div className="flex justify-between text-muted-foreground text-sm my-2">
              <span className="flex gap-1 items-center">
                <Baseline className="size-[1em]" />
                {`${formatNumber(chapter.numberOfWords, { short: true })} từ`}
              </span>
              <span className="flex gap-1 items-center">
                <Eye className="size-[1em]" />
                {formatNumber(chapter.numberOfViews, { short: true })}
              </span>
            </div>
            <p className="whitespace-pre-line bg-accent p-4 rounded-sm text-lg">
              {chapter.content}
            </p>
            <div className="flex justify-between text-muted-foreground text-sm mt-2 mb-6">
              <span className="flex gap-1 items-center">
                <Heart className="size-[1em]" color="#F75270" fill="#F75270" />
                {formatNumber(chapter.numberOfVotes, { short: true })}
              </span>
              {!!chapter.publishedAt && (
                <span>{formatDate(chapter.publishedAt)}</span>
              )}
            </div>
            {chapterNavigator}
          </main>

          {isShowChapterListPopup && (
            <Dialog
              open={isShowChapterListPopup}
              onOpenChange={(nextOpen) => changeOpenChapterListPopup(nextOpen)}
            >
              <DialogContent className="gap-2">
                <DialogTitle className="font-bold">
                  {chapter.novelTitle}
                </DialogTitle>
                <DialogDescription className="text-left font-bold text-gray-900 mb-2">
                  {chapter.totalChapters} Chương
                </DialogDescription>
                <ScrollArea className="max-h-[60vh] pr-4 border p-2 rounded-sm">
                  <Table className="table-fixed w-full">
                    <TableBody>
                      {chapterList.map((currentChapter) => (
                        <TableRow
                          key={currentChapter.id}
                          id={`chapter-${currentChapter.id}`}
                          className={
                            currentChapter.id === chapter.id ? "bg-accent" : ""
                          }
                        >
                          <TableCell>
                            <Link
                              to={`/chapters/${currentChapter.id}`}
                              className="block w-full truncate font-semibold"
                            >
                              {currentChapter.title}
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};
