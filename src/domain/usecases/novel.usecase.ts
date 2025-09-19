import type {
  ICreateNovelPayload,
  IGetMyNovelDetailResponse,
  IUpdateNovelPayload,
} from "../entities/novel.entity";
import type { INovelRepository } from "../repositories-interface/novel.repository";

export const NovelUseCase = (novelRepository: INovelRepository) => {
  const getMyNovels = async (
    status: "published" | "draft" | "all",
    page: number,
    limit: number
  ) => {
    const response = await novelRepository.getMyNovels(status, page, limit);
    return response;
  };

  const createNovel = async (payload: ICreateNovelPayload) => {
    const response = await novelRepository.createNovel(payload);
    return response;
  };

  const getMyNovelDetail = async (
    myNovelId: number
  ): Promise<IGetMyNovelDetailResponse> => {
    const response = await novelRepository.getMyNovelDetail(myNovelId);
    return response;
  };

  const updateMyNovel = async (
    myNovelId: number,
    payload: IUpdateNovelPayload
  ) => {
    const response = await novelRepository.updateMyNovel(myNovelId, payload);
    return response;
  };

  const deleteMyNovel = async (myNovelId: number) => {
    const response = await novelRepository.deleteMyNovel(myNovelId);
    return response;
  };

  const uploadCover = async (params: {
    novelId: number;
    imageBlob: Blob;
    fileName: string;
  }) => {
    const response = await novelRepository.uploadCover(params);
    return response;
  };

  return {
    getMyNovels,
    createNovel,
    getMyNovelDetail,
    updateMyNovel,
    deleteMyNovel,
    uploadCover,
  };
};
