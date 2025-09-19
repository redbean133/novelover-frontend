import type { Sort } from "@/shared/constants/constants";
import type { IUpdateChapterDto } from "../entities/chapter.entity";
import type { IChapterRepository } from "../repositories-interface/chapter.repository";

export const ChapterUseCase = (chapterRepository: IChapterRepository) => {
  const getAllChaptersOfNovel = async (params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
  }) => {
    const response = await chapterRepository.getAllChaptersOfNovel(params);
    return response;
  };

  const getChapterDetail = async (chapterId: number) => {
    const response = await chapterRepository.getChapterDetail(chapterId);
    return response;
  };

  const createNewChapter = async (novelId: number) => {
    const response = await chapterRepository.createNewChapter(novelId);
    return response;
  };

  const updateChapter = async (
    chapterId: number,
    payload: IUpdateChapterDto
  ) => {
    const response = await chapterRepository.updateChapter(chapterId, payload);
    return response;
  };

  const deleteChapter = async (chapterId: number) => {
    const response = await chapterRepository.deleteChapter(chapterId);
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
