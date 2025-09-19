import { ChapterRepositoryImpl } from "@/data/repositories-implementation/chapter.repositoryImpl";
import { NovelRepositoryImpl } from "@/data/repositories-implementation/novel.repositoryImpl";
import type { IUpdateNovelPayload } from "@/domain/entities/novel.entity";
import { ChapterUseCase } from "@/domain/usecases/chapter.usecase";
import { NovelUseCase } from "@/domain/usecases/novel.usecase";
import {
  updateChapterListData,
  updateNovelDetailData,
  updateNovelFormData,
  type IMyNovelsState,
} from "@/presentation/redux/slices/myNovels.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const MyNovelDetailViewModel = () => {
  const { id: novelId } = useParams();
  const novelUseCase = useMemo(
    () => NovelUseCase(new NovelRepositoryImpl()),
    []
  );
  const chapterUseCase = useMemo(
    () => ChapterUseCase(new ChapterRepositoryImpl()),
    []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isLoadingChapters,
    novel,
    chapterListData,
    isLoadingCreateNewChapter,
  } = useSelector((state: RootState) => state.myNovels.novelDetail);
  const chapterListRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    getNovelDetail();

    return () => {
      dispatch(updateNovelDetailData({ isEditMode: false }));
    };
  }, [novelId]);

  useEffect(() => {
    const fetchAndScroll = async () => {
      await getChapters();
      scrollToChaptersList();
    };

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      getChapters();
    } else fetchAndScroll();
  }, [chapterListData.page, chapterListData.limit, chapterListData.sort]);

  const scrollToChaptersList = () => {
    if (chapterListRef.current) {
      chapterListRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const getNovelDetail = async () => {
    if (isLoading) return;
    try {
      dispatch(updateNovelDetailData({ isLoading: true }));
      const novelDetailData = await novelUseCase.getMyNovelDetail(+novelId!);
      dispatch(updateNovelDetailData(novelDetailData));
      const { title, isOriginal, author, description, genres } =
        novelDetailData.novel;
      dispatch(
        updateNovelFormData({
          title,
          isValidTitle: true,
          isOriginal,
          authorName: author ? author.name : "",
          isValidAuthorName: true,
          selectedGenreIds: genres.map((genre) => genre.id.toString()),
          isValidGenre: true,
          description,
        })
      );
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
      navigate("/");
    } finally {
      dispatch(updateNovelDetailData({ isLoading: false }));
    }
  };

  const getChapters = async () => {
    if (isLoadingChapters || !novelId) return;

    try {
      dispatch(updateNovelDetailData({ isLoadingChapters: true }));
      const result = await chapterUseCase.getAllChaptersOfNovel({
        novelId: +novelId,
        page: chapterListData.page,
        limit: chapterListData.limit,
        sort: chapterListData.sort,
      });
      dispatch(updateChapterListData(result));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
      navigate("/");
    } finally {
      dispatch(updateNovelDetailData({ isLoadingChapters: false }));
    }
  };

  const openConfirmPublishedPopup = (open: boolean) => {
    dispatch(updateNovelDetailData({ isShowPublishedConfirmPopup: open }));
  };

  const openConfirmCompletedPopup = (open: boolean) => {
    dispatch(updateNovelDetailData({ isShowCompletedConfirmPopup: open }));
  };

  const openConfirmDeletePopup = (open: boolean) => {
    dispatch(updateNovelDetailData({ isShowDeleteConfirmPopup: open }));
  };

  const updateNovel = async (payload: IUpdateNovelPayload) => {
    if (!novelId) return;

    try {
      dispatch(updateNovelDetailData({ isLoadingConfirm: true }));
      const updatedNovel = await novelUseCase.updateMyNovel(+novelId, payload);
      if (updatedNovel) {
        toast.success("Cập nhật thành công");
        dispatch(
          updateNovelDetailData({ novel: updatedNovel, isEditMode: false })
        );
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelDetailData({ isLoadingConfirm: false }));
    }
  };

  const onConfirmPublished = async () => {
    await updateNovel({ isPublished: !novel.isPublished });
    openConfirmPublishedPopup(false);
  };

  const onConfirmCompleted = async () => {
    await updateNovel({ isCompleted: !novel.isCompleted });
    openConfirmCompletedPopup(false);
  };

  const deleteNovel = async () => {
    if (!novelId) return;
    try {
      dispatch(updateNovelDetailData({ isLoadingConfirm: true }));
      const { success } = await novelUseCase.deleteMyNovel(+novelId);
      if (success) {
        toast.success("Xoá truyện thành công");
        navigate("/my-novels");
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelDetailData({ isLoadingConfirm: false }));
      openConfirmDeletePopup(false);
    }
  };

  const onChangeEditMode = (isEditMode: boolean) => {
    dispatch(updateNovelDetailData({ isEditMode }));
  };

  const uploadCover = async (payload: { blob: Blob; fileName: string }) => {
    if (!novelId) return;

    const { blob, fileName } = payload;
    try {
      const novel = await novelUseCase.uploadCover({
        novelId: +novelId,
        imageBlob: blob,
        fileName,
      });
      dispatch(updateNovelDetailData({ novel }));
      toast.success("Cập nhật bìa truyện thành công");
      return novel.coverUrl;
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống, mời thử lại."
      );
    }
  };

  const updateChapterListDataState = (
    data: Partial<IMyNovelsState["novelDetail"]["chapterListData"]>
  ) => {
    dispatch(updateChapterListData({ ...data }));
  };

  const createNewChapter = async () => {
    if (isLoadingCreateNewChapter || !novelId) return;

    try {
      dispatch(updateNovelDetailData({ isLoadingCreateNewChapter: true }));
      const newChapter = await chapterUseCase.createNewChapter(+novelId);
      if (newChapter) {
        navigate(`/chapters/${newChapter.id}/edit`);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelDetailData({ isLoadingCreateNewChapter: false }));
    }
  };

  const goToEditChapter = (chapterId: number) => {
    navigate(`/chapters/${chapterId}/edit`);
  };

  return {
    chapterListRef,
    onChangeEditMode,
    onConfirmPublished,
    onConfirmCompleted,
    openConfirmCompletedPopup,
    openConfirmDeletePopup,
    openConfirmPublishedPopup,
    deleteNovel,
    uploadCover,
    updateChapterListDataState,
    createNewChapter,
    goToEditChapter,
  };
};
