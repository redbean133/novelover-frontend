import type { IMyNovelRepository } from "@/domain/repositories-interface/myNovel.repository";
import apiService from "../sources/apiService";
import type {
  FullInfoNovel,
  ICreateNovelPayload,
  IGetNovelsResponse,
  IUpdateNovelPayload,
} from "@/domain/entities/novel.entity";

export class MyNovelRepositoryImpl implements IMyNovelRepository {
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

  async createNovel(payload: ICreateNovelPayload): Promise<FullInfoNovel> {
    const response = await apiService.post<FullInfoNovel>(
      `/my-novels`,
      payload
    );
    return response.data;
  }

  async getMyNovelDetail(myNovelId: number): Promise<FullInfoNovel> {
    const response = await apiService.get<FullInfoNovel>(
      `/my-novels/${myNovelId}`
    );
    return response.data;
  }

  async updateMyNovel(
    myNovelId: number,
    payload: IUpdateNovelPayload
  ): Promise<FullInfoNovel> {
    const response = await apiService.patch<FullInfoNovel>(
      `/my-novels/${myNovelId}`,
      payload
    );
    return response.data;
  }

  async publishMyNovel(
    myNovelId: number,
    isPublished: boolean
  ): Promise<FullInfoNovel> {
    const response = await apiService.patch<FullInfoNovel>(
      `/my-novels/${myNovelId}/publish`,
      {
        isPublished,
      }
    );
    return response.data;
  }

  async completeMyNovel(
    myNovelId: number,
    isCompleted: boolean
  ): Promise<FullInfoNovel> {
    const response = await apiService.patch<FullInfoNovel>(
      `/my-novels/${myNovelId}/complete`,
      {
        isCompleted,
      }
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
  }): Promise<FullInfoNovel> {
    const { novelId, imageBlob, fileName } = params;

    const formData = new FormData();
    formData.append("file", imageBlob, fileName);

    const response = await apiService.patch<FullInfoNovel>(
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
