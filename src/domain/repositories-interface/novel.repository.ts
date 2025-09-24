import type { PublicNovel } from "../entities/novel.entity";

export interface INovelRepository {
  // getNovels: (page: number, limit: number) => Promise<IGetNovelsResponse>;

  getNovelDetail: (novelId: number) => Promise<PublicNovel>;
}
