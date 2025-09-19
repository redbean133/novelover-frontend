import {
  initialChapter,
  type Chapter,
  type IChapterListResponse,
} from "@/domain/entities/chapter.entity";
import type { GenreWithoutDescription } from "@/domain/entities/genre.entity";
import {
  initialGetNovelsResponse,
  initialNovel,
  type IGetNovelsResponse,
  type Novel,
} from "@/domain/entities/novel.entity";
import type { Sort } from "@/shared/constants/constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ICreateNovelState {
  title: string;
  isOriginal: boolean;
  authorName: string;
  description: string;
  coverUrl: string;
  genres: GenreWithoutDescription[];
  selectedGenreIds: string[];
}

export interface IMyNovelsState {
  countRender: number;
  isLoading: boolean;
  tab: "published" | "draft";
  novels: IGetNovelsResponse;

  novelFormData: ICreateNovelState & {
    isLoadingSubmitForm: boolean;
    isValidTitle: boolean;
    titleValidation: string;
    isValidGenre: boolean;
    genreValidation: string;
    isValidAuthorName: boolean;
    authorNameValidation: string;
    authorSuggestions: string[];
    isSelectAuthor: boolean;
  };

  novelDetail: {
    isLoading: boolean;
    isEditMode: boolean;
    novel: Novel;
    isShowPublishedConfirmPopup: boolean;
    isShowCompletedConfirmPopup: boolean;
    isShowDeleteConfirmPopup: boolean;
    isLoadingConfirm: boolean;

    isLoadingChapters: boolean;
    chapterListData: IChapterListResponse & {
      sort: Sort;
    };
    isLoadingCreateNewChapter: boolean;
  };

  chapterDetail: {
    isLoadingChapterDetail: boolean;
    isLoadingSaveData: boolean;
    chapter: Chapter;
    isShowPublishedConfirmPopup: boolean;
    isShowDeleteConfirmPopup: boolean;
    isLoadingConfirm: boolean;

    inputTitle: string;
    inputContent: string;
    numberOfWords: number;
  };
}

const initialState: IMyNovelsState = {
  countRender: 0,
  isLoading: false,
  tab: "published",
  novels: initialGetNovelsResponse,

  novelFormData: {
    title: "",
    isOriginal: false,
    authorName: "",
    description: "",
    coverUrl: "",
    genres: [],
    selectedGenreIds: [],
    isLoadingSubmitForm: false,
    isValidTitle: false,
    titleValidation: "",
    isValidGenre: false,
    genreValidation: "",
    isValidAuthorName: false,
    authorNameValidation: "",
    authorSuggestions: [],
    isSelectAuthor: false,
  },

  novelDetail: {
    isLoading: false,
    isEditMode: false,
    novel: initialNovel,
    isShowPublishedConfirmPopup: false,
    isShowCompletedConfirmPopup: false,
    isShowDeleteConfirmPopup: false,
    isLoadingConfirm: false,

    isLoadingChapters: false,
    chapterListData: {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0,
      data: [],
      sort: "DESC",
    },
    isLoadingCreateNewChapter: false,
  },

  chapterDetail: {
    isLoadingChapterDetail: false,
    isLoadingSaveData: false,
    chapter: initialChapter,
    isShowPublishedConfirmPopup: false,
    isShowDeleteConfirmPopup: false,
    isLoadingConfirm: false,

    inputTitle: "",
    inputContent: "",
    numberOfWords: 0,
  },
};

const myNovelsSlice = createSlice({
  name: "myNovels",
  initialState,
  reducers: {
    updateMyNovelsState: (
      state,
      action: PayloadAction<Partial<IMyNovelsState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateNovelsData: (
      state,
      action: PayloadAction<Partial<IGetNovelsResponse>>
    ) => {
      state.novels = { ...state.novels, ...action.payload };
    },
    updateNovelFormData: (
      state,
      action: PayloadAction<Partial<IMyNovelsState["novelFormData"]>>
    ) => {
      state.novelFormData = { ...state.novelFormData, ...action.payload };
    },
    updateNovelDetailData: (
      state,
      action: PayloadAction<Partial<IMyNovelsState["novelDetail"]>>
    ) => {
      state.novelDetail = { ...state.novelDetail, ...action.payload };
    },
    updateChapterListData: (
      state,
      action: PayloadAction<
        Partial<IMyNovelsState["novelDetail"]["chapterListData"]>
      >
    ) => {
      state.novelDetail.chapterListData = {
        ...state.novelDetail.chapterListData,
        ...action.payload,
      };
    },
    updateChapterDetailData: (
      state,
      action: PayloadAction<Partial<IMyNovelsState["chapterDetail"]>>
    ) => {
      state.chapterDetail = { ...state.chapterDetail, ...action.payload };
    },
    reinitMyNovelsState: (state) => {
      return { ...initialState, countRender: state.countRender + 1 };
    },
    reinitNovelFormData: (state) => {
      state.novelFormData = initialState.novelFormData;
    },
    reinitChapterDetailData: (state) => {
      state.chapterDetail = initialState.chapterDetail;
    },
    reinitNovelDetailData: (state) => {
      state.novelDetail = initialState.novelDetail;
    },
  },
});

export const {
  updateMyNovelsState,
  updateNovelsData,
  reinitMyNovelsState,
  updateNovelFormData,
  reinitNovelFormData,
  updateNovelDetailData,
  updateChapterListData,
  updateChapterDetailData,
  reinitChapterDetailData,
  reinitNovelDetailData,
} = myNovelsSlice.actions;
export default myNovelsSlice.reducer;
