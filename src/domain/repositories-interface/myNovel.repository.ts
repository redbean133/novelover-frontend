import type {
  FullInfoNovel,
  ICreateNovelPayload,
  IGetNovelsResponse,
  IUpdateNovelPayload,
} from "../entities/novel.entity";

export interface IMyNovelRepository {
  getMyNovels: (
    status: "published" | "draft" | "all",
    page: number,
    limit: number
  ) => Promise<IGetNovelsResponse>;

  createNovel: (payload: ICreateNovelPayload) => Promise<FullInfoNovel>;

  getMyNovelDetail: (myNovelId: number) => Promise<FullInfoNovel>;

  updateMyNovel: (
    myNovelId: number,
    payload: IUpdateNovelPayload
  ) => Promise<FullInfoNovel>;

  publishMyNovel: (
    myNovelId: number,
    isPublished: boolean
  ) => Promise<FullInfoNovel>;

  completeMyNovel: (
    myNovelId: number,
    isCompleted: boolean
  ) => Promise<FullInfoNovel>;

  deleteMyNovel: (myNovelId: number) => Promise<{ success: boolean }>;

  uploadCover: (params: {
    novelId: number;
    imageBlob: Blob;
    fileName: string;
  }) => Promise<FullInfoNovel>;
}
