import type { IChapterListResponse } from "@/domain/entities/chapter.entity";
import type { PublicNovel } from "@/domain/entities/novel.entity";
import type { Sort } from "@/shared/constants/constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface INovelDetailState {
  isLoadingNovel: boolean;
  isLoadingReviews: boolean;
  isLoadingChapters: boolean;
  tab: "description" | "reviews" | "chapters";
  novel: PublicNovel;

  chapterListData: IChapterListResponse & {
    sort: Sort;
  };
}

const initialState: INovelDetailState = {
  isLoadingNovel: false,
  isLoadingReviews: false,
  isLoadingChapters: false,
  tab: "description",
  novel: {
    id: 0,
    title: "",
    coverUrl: "",
    isOriginal: false,
    contributorId: "",
    numberOfPublishedChapters: 0,
    numberOfReviews: 0,
    numberOfVotes: 0,
    numberOfViews: 0,
    description: "",
    averageRating: "0.00",
    publishedAt: "",
    isCompleted: false,
    completedAt: "",
    author: {
      id: 0,
      name: "",
    },
    genres: [],
    contributorName: "",
  },

  chapterListData: {
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 0,
    data: [],
    sort: "ASC",
  },
};

const novelDetailSlice = createSlice({
  name: "novelDetail",
  initialState,
  reducers: {
    updateNovelDetailState: (
      state,
      action: PayloadAction<Partial<INovelDetailState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateChapterListDataState: (
      state,
      action: PayloadAction<Partial<INovelDetailState["chapterListData"]>>
    ) => {
      state.chapterListData = { ...state.chapterListData, ...action.payload };
    },
    reinitNovelDetailState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  updateNovelDetailState,
  updateChapterListDataState,
  reinitNovelDetailState,
} = novelDetailSlice.actions;
export default novelDetailSlice.reducer;
