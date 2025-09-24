import type { Sort } from "@/shared/constants/constants";
import type { IUpdateChapterDto } from "../entities/chapter.entity";
import type { IMyChapterRepository } from "../repositories-interface/myChapter.repository";

export const MyChapterUseCase = (myChapterRepository: IMyChapterRepository) => {
  const getAllChaptersOfNovel = async (params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
    isPublishedOnly?: boolean;
  }) => {
    const response = await myChapterRepository.getAllChaptersOfNovel(params);
    return response;
  };

  const getChapterDetail = async (chapterId: number) => {
    const response = await myChapterRepository.getChapterDetail(chapterId);
    return response;
  };

  const createNewChapter = async (novelId: number) => {
    const response = await myChapterRepository.createNewChapter(novelId);
    return response;
  };

  const updateChapter = async (
    chapterId: number,
    payload: IUpdateChapterDto
  ) => {
    const response = await myChapterRepository.updateChapter(
      chapterId,
      payload
    );
    return response;
  };

  const deleteChapter = async (chapterId: number) => {
    const response = await myChapterRepository.deleteChapter(chapterId);
    return response;
  };

  return {
    getAllChaptersOfNovel,
    getChapterDetail,
    createNewChapter,
    updateChapter,
    deleteChapter,
  };
};
