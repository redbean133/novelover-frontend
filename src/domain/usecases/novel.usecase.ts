import type { INovelRepository } from "../repositories-interface/novel.repository";

export const NovelUseCase = (novelRepository: INovelRepository) => {
  const getNovelDetail = async (novelId: number) => {
    const response = await novelRepository.getNovelDetail(novelId);
    return response;
  };

  return { getNovelDetail };
};
