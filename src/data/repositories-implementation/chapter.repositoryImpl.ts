import type {
  IChapterListResponse,
  PublicChapter,
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

  async getChapterDetail(chapterId: number): Promise<PublicChapter> {
    const response = await apiService.get<PublicChapter>(
      `/chapters/${chapterId}`
    );
    return response.data;
  }

  async findAudio(chapterId: number): Promise<PublicChapter> {
    const response = await apiService.get<PublicChapter>(
      `/chapters/${chapterId}/audio`,
      { timeout: 600000 }
    );
    return response.data;
  }
}
