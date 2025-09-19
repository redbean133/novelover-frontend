import { paginationSizeArray } from "@/shared/constants/constants";
import type { AuthorWithoutBiography } from "./author.entity";
import type { GenreWithoutDescription } from "./genre.entity";

export interface Novel {
  id: number;
  title: string;
  coverUrl: string;
  isOriginal: boolean;
  contributorId: string;
  numberOfChapters: number;
  numberOfPublishedChapters: number;
  numberOfReviews: number;
  numberOfVotes: number;
  numberOfViews: number;
  description: string;
  averageRating: string;
  isPublished: boolean;
  publishedAt: Date | string;
  isCompleted: boolean;
  completedAt: Date | string;
  createdAt: Date | string;
  lastUpdatedAt: Date | string;
  deletedAt: Date | string;
  author: AuthorWithoutBiography;
  genres: GenreWithoutDescription[];
  contributorName: string;
}

export const initialNovel = {
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
  data: Novel[];
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

export interface IGetMyNovelDetailResponse {
  novel: Novel;
}
