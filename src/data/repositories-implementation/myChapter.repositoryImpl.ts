import type {
  IMyChapterListResponse,
  IUpdateChapterDto,
  MyChapter,
} from "@/domain/entities/chapter.entity";
import apiService from "../sources/apiService";
import type { Sort } from "@/shared/constants/constants";
import type { IMyChapterRepository } from "@/domain/repositories-interface/myChapter.repository";

export class MyChapterRepositoryImpl implements IMyChapterRepository {
  async getAllChaptersOfNovel(params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
    isPublishedOnly?: boolean;
  }): Promise<IMyChapterListResponse> {
    const response = await apiService.get<IMyChapterListResponse>(
      `/my-chapters`,
      {
        params,
      }
    );
    return response.data;
  }

  async getChapterDetail(chapterId: number): Promise<MyChapter> {
    const response = await apiService.get<MyChapter>(
      `/my-chapters/${chapterId}`
    );
    return response.data;
  }

  async createNewChapter(novelId: number): Promise<MyChapter> {
    const response = await apiService.post<MyChapter>(`/my-chapters`, {
      novelId,
    });
    return response.data;
  }

  async updateChapter(
    chapterId: number,
    payload: IUpdateChapterDto
  ): Promise<MyChapter> {
    const response = await apiService.patch<MyChapter>(
      `/my-chapters/${chapterId}`,
      payload
    );
    return response.data;
  }

  async deleteChapter(chapterId: number): Promise<{ success: boolean }> {
    const response = await apiService.delete<{ success: boolean }>(
      `/my-chapters/${chapterId}`
    );
    return response.data;
  }
}
