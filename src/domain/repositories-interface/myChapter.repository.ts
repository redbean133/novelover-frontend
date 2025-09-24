import type { Sort } from "@/shared/constants/constants";
import type {
  IMyChapterListResponse,
  IUpdateChapterDto,
  MyChapter,
} from "../entities/chapter.entity";

export interface IMyChapterRepository {
  getAllChaptersOfNovel: (params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
    isPublishedOnly?: boolean;
  }) => Promise<IMyChapterListResponse>;

  getChapterDetail: (chapterId: number) => Promise<MyChapter>;

  createNewChapter: (novelId: number) => Promise<MyChapter>;

  updateChapter: (
    chapterId: number,
    payload: IUpdateChapterDto
  ) => Promise<MyChapter>;

  deleteChapter: (chapterId: number) => Promise<{ success: boolean }>;
}
