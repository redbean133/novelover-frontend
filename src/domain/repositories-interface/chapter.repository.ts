import type { Sort } from "@/shared/constants/constants";
import type {
  Chapter,
  IChapterListResponse,
  IUpdateChapterDto,
} from "../entities/chapter.entity";

export interface IChapterRepository {
  getAllChaptersOfNovel: (params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
  }) => Promise<IChapterListResponse>;

  getChapterDetail: (chapterId: number) => Promise<Chapter>;

  createNewChapter: (novelId: number) => Promise<Chapter>;

  updateChapter: (
    chapterId: number,
    payload: IUpdateChapterDto
  ) => Promise<Chapter>;

  deleteChapter: (chapterId: number) => Promise<{ success: boolean }>;
}
