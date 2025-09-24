import { ChapterRepositoryImpl } from "@/data/repositories-implementation/chapter.repositoryImpl";
import { NovelRepositoryImpl } from "@/data/repositories-implementation/novel.repositoryImpl";
import { ChapterUseCase } from "@/domain/usecases/chapter.usecase";
import { NovelUseCase } from "@/domain/usecases/novel.usecase";
import {
  updateChapterListDataState,
  updateNovelDetailState,
  type INovelDetailState,
} from "@/presentation/redux/slices/novelDetail.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const NovelDetailViewModel = () => {
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
  const { isLoadingNovel, isLoadingChapters, chapterListData, tab } =
    useSelector((state: RootState) => state.novelDetail);
  const navigate = useNavigate();

  useEffect(() => {
    getNovelDetail();
  }, [novelId]);

  useEffect(() => {
    getChaptersAndScrollToTop();
  }, [tab, chapterListData.page, chapterListData.limit, chapterListData.sort]);

  const getNovelDetail = async () => {
    if (!novelId || isLoadingNovel) return;

    try {
      dispatch(updateNovelDetailState({ isLoadingNovel: true }));
      const novel = await novelUseCase.getNovelDetail(+novelId);
      if (novel) dispatch(updateNovelDetailState({ novel }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelDetailState({ isLoadingNovel: false }));
    }
  };

  const getChaptersAndScrollToTop = async () => {
    await getChapters();
    scrollToTopOfChapterList();
  };

  const getChapters = async () => {
    if (isLoadingChapters || !novelId || tab !== "chapters") return;

    try {
      dispatch(updateNovelDetailState({ isLoadingChapters: true }));
      const result = await chapterUseCase.getAllChaptersOfNovel({
        novelId: +novelId,
        page: chapterListData.page,
        limit: chapterListData.limit,
        sort: chapterListData.sort,
      });
      dispatch(updateChapterListDataState(result));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateNovelDetailState({ isLoadingChapters: false }));
    }
  };

  const scrollToTopOfChapterList = () => {
    const element = document.getElementById("chapters-tab");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChangeTab = (tabName: "description" | "reviews" | "chapters") => {
    dispatch(updateNovelDetailState({ tab: tabName }));
  };

  const goToMyNovelDetailPage = () => {
    navigate(`/my-novels/${novelId}`);
  };

  const updateChapterListData = (
    payload: Partial<INovelDetailState["chapterListData"]>
  ) => {
    dispatch(updateChapterListDataState(payload));
  };

  return { onChangeTab, goToMyNovelDetailPage, updateChapterListData };
};
