import type { Sort } from "@/shared/constants/constants";
import type {
  IChapterListResponse,
  PublicChapter,
} from "../entities/chapter.entity";

export interface IChapterRepository {
  getAllChaptersOfNovel: (params: {
    novelId: number;
    page?: number;
    limit?: number;
    sort?: Sort;
  }) => Promise<IChapterListResponse>;

  getChapterDetail: (chapterId: number) => Promise<PublicChapter>;

  findAudio: (chapterId: number) => Promise<PublicChapter>;
}
