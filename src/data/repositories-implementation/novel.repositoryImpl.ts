import type { INovelRepository } from "@/domain/repositories-interface/novel.repository";
import apiService from "../sources/apiService";
import type {
  ICreateNovelPayload,
  IGetMyNovelDetailResponse,
  IGetNovelsResponse,
  IUpdateNovelPayload,
  Novel,
} from "@/domain/entities/novel.entity";

export class NovelRepositoryImpl implements INovelRepository {
  async getMyNovels(
    status: "published" | "draft" | "all",
    page: number,
    limit: number
  ): Promise<IGetNovelsResponse> {
    const response = await apiService.get<IGetNovelsResponse>(`/my-novels`, {
      params: {
        status,
        page,
        limit,
      },
    });
    return response.data;
  }

  async createNovel(payload: ICreateNovelPayload): Promise<Novel> {
    const response = await apiService.post<Novel>(`/my-novels`, payload);
    return response.data;
  }

  async getMyNovelDetail(
    myNovelId: number
  ): Promise<IGetMyNovelDetailResponse> {
    const response = await apiService.get<IGetMyNovelDetailResponse>(
      `/my-novels/${myNovelId}`
    );
    return response.data;
  }

  async updateMyNovel(
    myNovelId: number,
    payload: IUpdateNovelPayload
  ): Promise<Novel> {
    const response = await apiService.patch<Novel>(
      `/my-novels/${myNovelId}`,
      payload
    );
    return response.data;
  }

  async deleteMyNovel(myNovelId: number): Promise<{ success: boolean }> {
    const response = await apiService.delete<{ success: boolean }>(
      `/my-novels/${myNovelId}`
    );
    return response.data;
  }

  async uploadCover(params: {
    novelId: number;
    imageBlob: Blob;
    fileName: string;
  }): Promise<Novel> {
    const { novelId, imageBlob, fileName } = params;

    const formData = new FormData();
    formData.append("file", imageBlob, fileName);

    const response = await apiService.patch<Novel>(
      `/my-novels/${novelId}/upload-cover`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
}
