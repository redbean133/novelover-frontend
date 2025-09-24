import type {
  FullInfoNovel,
  ICreateNovelPayload,
  IUpdateNovelPayload,
} from "../entities/novel.entity";
import type { IMyNovelRepository } from "../repositories-interface/myNovel.repository";

export const MyNovelUseCase = (myNovelRepository: IMyNovelRepository) => {
  const getMyNovels = async (
    status: "published" | "draft" | "all",
    page: number,
    limit: number
  ) => {
    const response = await myNovelRepository.getMyNovels(status, page, limit);
    return response;
  };

  const createNovel = async (payload: ICreateNovelPayload) => {
    const response = await myNovelRepository.createNovel(payload);
    return response;
  };

  const getMyNovelDetail = async (
    myNovelId: number
  ): Promise<FullInfoNovel> => {
    const response = await myNovelRepository.getMyNovelDetail(myNovelId);
    return response;
  };

  const updateMyNovel = async (
    myNovelId: number,
    payload: IUpdateNovelPayload
  ) => {
    const response = await myNovelRepository.updateMyNovel(myNovelId, payload);
    return response;
  };

  const publishMyNovel = async (myNovelId: number, isPublished: boolean) => {
    const response = await myNovelRepository.publishMyNovel(
      myNovelId,
      isPublished
    );
    return response;
  };

  const completeMyNovel = async (myNovelId: number, isCompleted: boolean) => {
    const response = await myNovelRepository.completeMyNovel(
      myNovelId,
      isCompleted
    );
    return response;
  };

  const deleteMyNovel = async (myNovelId: number) => {
    const response = await myNovelRepository.deleteMyNovel(myNovelId);
    return response;
  };

  const uploadCover = async (params: {
    novelId: number;
    imageBlob: Blob;
    fileName: string;
  }) => {
    const response = await myNovelRepository.uploadCover(params);
    return response;
  };

  return {
    getMyNovels,
    createNovel,
    getMyNovelDetail,
    updateMyNovel,
    publishMyNovel,
    completeMyNovel,
    deleteMyNovel,
    uploadCover,
  };
};
