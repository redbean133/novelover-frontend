import { paginationSizeArray } from "@/shared/constants/constants";
import type { GenreWithoutDescription } from "./genre.entity";
import type { Author } from "./author.entity";

export interface MyNovelInList {
  id: number;
  title: string;
  coverUrl: string;
  isOriginal: boolean;
  numberOfPublishedChapters: number;
  numberOfChapters: number;
  numberOfViews: number;
  author: Author;
  isCompleted: boolean;
  averageRating: number;
}

export interface PublicNovelInList {
  id: number;
  title: string;
  coverUrl: string;
  isOriginal: boolean;
  contributorId: string;
  numberOfPublishedChapters: number;
  description: string;
  numberOfViews: number;
  author: Author;
  genres: GenreWithoutDescription[];
  isCompleted: boolean;
  contributorName?: string;
}

export interface PublicNovel extends PublicNovelInList {
  numberOfReviews: number;
  numberOfVotes: number;
  averageRating: string;
  publishedAt: Date | string;
  completedAt: Date | string;
}

export interface FullInfoNovel extends PublicNovel {
  isPublished: boolean;
  numberOfChapters: number;
  createdAt: Date | string;
  lastUpdatedAt: Date | string;
  deletedAt: Date | string;
}

export const initialFullInfoNovel: FullInfoNovel = {
  id: 0,
  title: "",
  coverUrl: "",
  isOriginal: false,
  contributorId: "",
  numberOfChapters: 0,
  numberOfPublishedChapters: 0,
  numberOfReviews: 0,
  numberOfVotes: 0,
  numberOfViews: 0,
  description: "",
  averageRating: "0.00",
  isPublished: false,
  publishedAt: "",
  isCompleted: false,
  completedAt: "",
  createdAt: "",
  lastUpdatedAt: "",
  deletedAt: "",
  author: {
    id: 0,
    name: "",
  },
  genres: [],
  contributorName: "",
};

export interface IGetNovelsResponse {
  data: MyNovelInList[] | PublicNovelInList[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const initialGetNovelsResponse = {
  data: [],
  total: 0,
  page: 1,
  limit: paginationSizeArray[0],
  totalPages: 0,
};

export interface ICreateNovelPayload {
  title: string;
  isOriginal: boolean;
  authorName?: string;
  description?: string;
  genreIds: number[];
}

export interface IUpdateNovelPayload extends Partial<ICreateNovelPayload> {
  coverUrl?: string;
  isPublished?: boolean;
  isCompleted?: boolean;
}
