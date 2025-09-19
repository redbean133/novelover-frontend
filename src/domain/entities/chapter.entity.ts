export interface Chapter {
  id: number;
  novelId: number;
  title: string;
  content: string;
  numberOfViews: number;
  numberOfWords: number;
  numberOfVotes: number;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterInList {
  id: number;
  title: string;
  numberOfViews: number;
  numberOfVotes: number;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
}

export const initialChapter = {
  id: 0,
  novelId: 0,
  title: "",
  content: "",
  numberOfViews: 0,
  numberOfWords: 0,
  numberOfVotes: 0,
  isPublished: false,
  publishedAt: "",
  createdAt: "",
  updatedAt: "",
};

export interface IChapterListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: ChapterInList[];
}

export interface IUpdateChapterDto {
  title?: string;
  content?: string;
  isPublished?: boolean;
}
