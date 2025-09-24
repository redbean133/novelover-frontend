import type { Sort } from "@/shared/constants/constants";
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

  return {
    getAllChaptersOfNovel,
    getChapterDetail,
  };
};
