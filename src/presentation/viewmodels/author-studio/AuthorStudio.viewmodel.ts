import { MyChapterRepositoryImpl } from "@/data/repositories-implementation/myChapter.repositoryImpl";
import { MyNovelRepositoryImpl } from "@/data/repositories-implementation/myNovel.repositoryImpl";
import { initialGetNovelsResponse } from "@/domain/entities/novel.entity";
import { MyChapterUseCase } from "@/domain/usecases/myChapter.usecase";
import { MyNovelUseCase } from "@/domain/usecases/myNovel.usecase";
import {
  reinitNovelDetailData,
  reinitNovelFormData,
  updateMyNovelsState,
  updateNovelsData,
} from "@/presentation/redux/slices/myNovels.slice";
import type { RootState } from "@/presentation/redux/store";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AuthorStudioViewModel = () => {
  const myNovelUseCase = useMemo(
    () => MyNovelUseCase(new MyNovelRepositoryImpl()),
    []
  );
  const myChapterUseCase = useMemo(
    () => MyChapterUseCase(new MyChapterRepositoryImpl()),
    []
  );
  const { tab, novels, countRender, isLoading } = useSelector(
    (state: RootState) => state.myNovels
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMyNovels = async () => {
    if (isLoading) return;
    try {
      dispatch(updateMyNovelsState({ isLoading: true }));
      const result = await myNovelUseCase.getMyNovels(
        tab,
        novels.page,
        novels.limit
      );
      dispatch(updateMyNovelsState({ novels: result }));
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    } finally {
      dispatch(updateMyNovelsState({ isLoading: false }));
    }
  };

  const onChangeTab = (tabName: "published" | "draft") => {
    dispatch(
      updateMyNovelsState({
        tab: tabName,
        novels: initialGetNovelsResponse,
      })
    );
  };

  const onChangePage = (page: number) => {
    dispatch(updateNovelsData({ page }));
  };

  const onChangeLimit = (limit: number) => {
    dispatch(updateNovelsData({ limit, page: 1 }));
  };

  const handleClickCreateNovel = () => {
    dispatch(reinitNovelFormData());
    navigate("/my-novels/create");
  };

  const handleClickNewChapter = async (novelId: number) => {
    try {
      const newChapter = await myChapterUseCase.createNewChapter(novelId);
      if (newChapter) {
        navigate(`/chapters/${newChapter.id}/edit`);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    }
  };

  const handleClickLinkToDetail = () => {
    dispatch(reinitNovelDetailData());
  };

  useEffect(() => {
    getMyNovels();
  }, [tab, novels.page, novels.limit, countRender]);

  return {
    onChangeTab,
    onChangePage,
    onChangeLimit,
    handleClickCreateNovel,
    handleClickNewChapter,
    handleClickLinkToDetail,
  };
};
