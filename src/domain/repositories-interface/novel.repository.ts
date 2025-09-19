import type {
  ICreateNovelPayload,
  IGetMyNovelDetailResponse,
  IGetNovelsResponse,
  IUpdateNovelPayload,
  Novel,
} from "../entities/novel.entity";

export interface INovelRepository {
  getMyNovels: (
    status: "published" | "draft" | "all",
    page: number,
    limit: number
  ) => Promise<IGetNovelsResponse>;

  createNovel: (payload: ICreateNovelPayload) => Promise<Novel>;

  getMyNovelDetail: (myNovelId: number) => Promise<IGetMyNovelDetailResponse>;

  updateMyNovel: (
    myNovelId: number,
    payload: IUpdateNovelPayload
  ) => Promise<Novel>;

  deleteMyNovel: (myNovelId: number) => Promise<{ success: boolean }>;

  uploadCover: (params: {
    novelId: number;
    imageBlob: Blob;
    fileName: string;
  }) => Promise<Novel>;
}
