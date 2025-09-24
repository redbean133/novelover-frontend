import type { PublicNovel } from "@/domain/entities/novel.entity";
import type { INovelRepository } from "@/domain/repositories-interface/novel.repository";
import apiService from "../sources/apiService";

export class NovelRepositoryImpl implements INovelRepository {
  // getNovels: (page: number, limit: number) => Promise<IGetNovelsResponse>;

  async getNovelDetail(novelId: number): Promise<PublicNovel> {
    const response = await apiService.get<PublicNovel>(`/novels/${novelId}`);
    return response.data;
  }
}
