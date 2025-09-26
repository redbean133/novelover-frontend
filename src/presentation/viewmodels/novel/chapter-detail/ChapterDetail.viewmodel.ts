import { ChapterRepositoryImpl } from "@/data/repositories-implementation/chapter.repositoryImpl";
import { ChapterUseCase } from "@/domain/usecases/chapter.usecase";
import {
  reinitChapterDetailStateAction,
  updateChapterDetailStateAction,
} from "@/presentation/redux/slices/chapterDetail.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const ChapterDetailViewModel = () => {
  const { id: chapterId } = useParams();
  const dispatch = useDispatch();
  const chapterUseCase = useMemo(
    () => ChapterUseCase(new ChapterRepositoryImpl()),
    []
  );
  const {
    isLoadingChapter,
    chapter,
    isLoadingChapterList,
    isShowChapterListPopup,
    chapterList,
    isLoadingAudio,
  } = useSelector((state: RootState) => state.chapterDetail);
  const navigate = useNavigate();

  useEffect(() => {
    getChapterDetail();

    return () => {
      dispatch(reinitChapterDetailStateAction());
    };
  }, [chapterId]);

  useEffect(() => {
    if (isShowChapterListPopup) {
      setTimeout(() => {
        scrollToCurrentChapter();
      }, 0);
    }
  }, [isShowChapterListPopup]);

  const getChapterDetail = async () => {
    if (!chapterId || isLoadingChapter) return;

    try {
      dispatch(updateChapterDetailStateAction({ isLoadingChapter: true }));
      const chapter = await chapterUseCase.getChapterDetail(+chapterId);
      dispatch(updateChapterDetailStateAction({ chapter }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateChapterDetailStateAction({ isLoadingChapter: false }));
    }
  };

  const backToNovelDetailPage = () => {
    navigate(`/novels/${chapter.novelId}`);
  };

  const handleChangeChapter = (id: number) => {
    navigate(`/chapters/${id}`);
  };

  const changeOpenChapterListPopup = (isOpen: boolean) => {
    dispatch(
      updateChapterDetailStateAction({ isShowChapterListPopup: isOpen })
    );
  };

  const handleViewChapterList = async () => {
    if (!chapter || !chapter.novelId || isLoadingChapterList) return;
    if (!isEmpty(chapterList)) {
      changeOpenChapterListPopup(true);
      return;
    }

    try {
      dispatch(updateChapterDetailStateAction({ isLoadingChapterList: true }));
      const { data: chapterList } = await chapterUseCase.getAllChaptersOfNovel({
        novelId: chapter.novelId,
        page: 1,
        limit: chapter.totalChapters,
        sort: "ASC",
      });
      dispatch(
        updateChapterDetailStateAction({
          chapterList,
          isShowChapterListPopup: true,
        })
      );
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateChapterDetailStateAction({ isLoadingChapterList: false }));
    }
  };

  const scrollToCurrentChapter = () => {
    console.log(document.getElementById(`chapter-${chapter.id}`));
    document
      .getElementById(`chapter-${chapter.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const findAudio = async () => {
    if (!chapterId || isLoadingAudio) return;

    try {
      dispatch(updateChapterDetailStateAction({ isLoadingAudio: true }));
      const chapter = await chapterUseCase.findAudio(+chapterId);
      dispatch(updateChapterDetailStateAction({ chapter }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateChapterDetailStateAction({ isLoadingAudio: false }));
    }
  };

  return {
    backToNovelDetailPage,
    handleChangeChapter,
    changeOpenChapterListPopup,
    handleViewChapterList,
    findAudio,
  };
};
