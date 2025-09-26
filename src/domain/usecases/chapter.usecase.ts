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

  const findAudio = async (chapterId: number) => {
    const response = await chapterRepository.findAudio(chapterId);
    return response;
  };

  return {
    getAllChaptersOfNovel,
    getChapterDetail,
    findAudio,
  };
};
