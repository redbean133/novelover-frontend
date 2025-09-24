export interface PublicChapterInList {
  id: number;
  title: string;
}

export interface MyChapterInList extends PublicChapterInList {
  numberOfViews: number;
  numberOfVotes: number;
  isPublished: boolean;
  publishedAt: Date | string;
  updatedAt: Date | string;
}

export interface PublicChapter {
  id: number;
  title: string;
  novelId: number;
  novelTitle: string;
  totalChapters: number;
  content: string;
  numberOfViews: number;
  numberOfWords: number;
  numberOfVotes: number;
  prevChapterId: number;
  nextChapterId: number;
  publishedAt: Date | string;
}

export const initialPublicChapter: PublicChapter = {
  id: NaN,
  novelId: NaN,
  novelTitle: "",
  totalChapters: 0,
  title: "",
  content: "",
  numberOfViews: 0,
  numberOfWords: 0,
  numberOfVotes: 0,
  prevChapterId: NaN,
  nextChapterId: NaN,
  publishedAt: "",
};

export interface MyChapter {
  id: number;
  title: string;
  novelId: number;
  novelTitle: string;
  content: string;
  numberOfWords: number;
  isPublished: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const initialMyChapter: MyChapter = {
  id: NaN,
  title: "",
  novelId: NaN,
  novelTitle: "",
  content: "",
  numberOfWords: NaN,
  isPublished: false,
  createdAt: "",
  updatedAt: "",
};

export interface IChapterListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: PublicChapterInList[];
}

export interface IMyChapterListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: MyChapterInList[];
}

export interface IUpdateChapterDto {
  title?: string;
  content?: string;
  isPublished?: boolean;
}
