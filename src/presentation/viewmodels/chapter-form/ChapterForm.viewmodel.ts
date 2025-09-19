import { ChapterRepositoryImpl } from "@/data/repositories-implementation/chapter.repositoryImpl";
import { ChapterUseCase } from "@/domain/usecases/chapter.usecase";
import {
  reinitChapterDetailData,
  updateChapterDetailData,
  type IMyNovelsState,
} from "@/presentation/redux/slices/myNovels.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const ChapterFormViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    inputContent,
    inputTitle,
    isLoadingChapterDetail,
    isLoadingSaveData,
    chapter,
  } = useSelector((state: RootState) => state.myNovels.chapterDetail);
  const chapterUseCase = useMemo(
    () => ChapterUseCase(new ChapterRepositoryImpl()),
    []
  );
  const { id: chapterId } = useParams();

  const updateChapterDetailDataState = (
    data: Partial<IMyNovelsState["chapterDetail"]>
  ) => {
    dispatch(updateChapterDetailData({ ...data }));
  };

  const getChapterDetail = async () => {
    try {
      updateChapterDetailDataState({ isLoadingChapterDetail: true });
      const chapter = await chapterUseCase.getChapterDetail(+chapterId!);
      updateChapterDetailDataState({
        chapter,
        inputTitle: chapter.title,
        inputContent: chapter.content,
        numberOfWords: chapter.numberOfWords,
      });
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      updateChapterDetailDataState({ isLoadingChapterDetail: false });
    }
  };

  useEffect(() => {
    if (isLoadingChapterDetail || !chapterId) return;
    getChapterDetail();

    return () => {
      dispatch(reinitChapterDetailData());
    };
  }, [chapterId]);

  const [debouncedContentToCountWords] = useDebounce(inputContent, 500);
  useEffect(() => {
    const wordsCount = debouncedContentToCountWords
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    updateChapterDetailDataState({ numberOfWords: wordsCount });
  }, [debouncedContentToCountWords]);

  const [debouncedContent] = useDebounce(inputContent, 1500);
  const [debouncedTitle] = useDebounce(inputTitle, 1500);
  const autoSaveChapter = async () => {
    try {
      updateChapterDetailDataState({ isLoadingSaveData: true });
      await chapterUseCase.updateChapter(+chapterId!, {
        title: debouncedTitle,
        content: debouncedContent,
      });
    } catch (error) {
      console.log(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      updateChapterDetailDataState({ isLoadingSaveData: false });
    }
  };

  useEffect(() => {
    if (
      isLoadingSaveData ||
      !chapterId ||
      (debouncedTitle === chapter.title && debouncedContent === chapter.content)
    )
      return;
    autoSaveChapter();
  }, [debouncedContent, debouncedTitle]);

  const updateChapter = async () => {
    try {
      updateChapterDetailDataState({ isLoadingSaveData: true });
      await chapterUseCase.updateChapter(+chapterId!, {
        title: inputTitle,
        content: inputContent,
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      updateChapterDetailDataState({ isLoadingSaveData: false });
    }
  };

  const openConfirmPublishedPopup = (open: boolean) => {
    updateChapterDetailDataState({ isShowPublishedConfirmPopup: open });
  };

  const openConfirmDeletePopup = (open: boolean) => {
    updateChapterDetailDataState({ isShowDeleteConfirmPopup: open });
  };

  const onConfirmPublished = async () => {
    try {
      updateChapterDetailDataState({ isLoadingConfirm: true });
      await chapterUseCase.updateChapter(+chapterId!, {
        isPublished: !chapter.isPublished,
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      updateChapterDetailDataState({ isLoadingConfirm: false });
      openConfirmPublishedPopup(false);
    }
  };

  const deleteChapter = async () => {
    if (!chapterId) return;

    try {
      updateChapterDetailDataState({ isLoadingConfirm: true });
      const { success } = await chapterUseCase.deleteChapter(+chapterId);
      if (success) {
        toast.success("Xoá chương truyện thành công");
        navigate(`/my-novels/${chapter.novelId}`);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      updateChapterDetailDataState({ isLoadingConfirm: false });
      openConfirmDeletePopup(false);
    }
  };

  return {
    updateChapterDetailDataState,
    updateChapter,
    openConfirmPublishedPopup,
    openConfirmDeletePopup,
    onConfirmPublished,
    deleteChapter,
  };
};
