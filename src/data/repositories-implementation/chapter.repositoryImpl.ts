import type {
  Chapter,
  IChapterListResponse,
  IUpdateChapterDto,
} from "@/domain/entities/chapter.entity";
import type { IChapterRepository } from "@/domain/repositories-interface/chapter.repository";
import apiService from "../sources/apiService";
import type { Sort } from "@/shared/constants/constants";

export class ChapterRepositoryImpl implements IChapterRepository {
  async getAllChaptersOfNovel(params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
  }): Promise<IChapterListResponse> {
    const response = await apiService.get<IChapterListResponse>(`/chapters`, {
      params,
    });
    return response.data;
  }

  async getChapterDetail(chapterId: number): Promise<Chapter> {
    const response = await apiService.get<Chapter>(`/chapters/${chapterId}`);
    return response.data;
  }

  async createNewChapter(novelId: number): Promise<Chapter> {
    const response = await apiService.post<Chapter>(`/chapters`, { novelId });
    return response.data;
  }

  async updateChapter(
    chapterId: number,
    payload: IUpdateChapterDto
  ): Promise<Chapter> {
    const response = await apiService.patch<Chapter>(
      `/chapters/${chapterId}`,
      payload
    );
    return response.data;
  }

  async deleteChapter(chapterId: number): Promise<{ success: boolean }> {
    const response = await apiService.delete<{ success: boolean }>(
      `/chapters/${chapterId}`
    );
    return response.data;
  }
}
