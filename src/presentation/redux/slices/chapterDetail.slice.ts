import {
  initialPublicChapter,
  type PublicChapter,
  type PublicChapterInList,
} from "@/domain/entities/chapter.entity";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IChapterDetailState {
  isLoadingChapter: boolean;
  chapter: PublicChapter;

  isLoadingChapterList: boolean;
  chapterList: PublicChapterInList[];
  isShowChapterListPopup: boolean;

  isLoadingAudio: boolean;
}

const initialState: IChapterDetailState = {
  isLoadingChapter: false,
  chapter: initialPublicChapter,

  isLoadingChapterList: false,
  chapterList: [],
  isShowChapterListPopup: false,

  isLoadingAudio: false,
};

const chapterDetailSlice = createSlice({
  name: "chapterDetail",
  initialState,
  reducers: {
    updateChapterDetailStateAction: (
      state,
      action: PayloadAction<Partial<IChapterDetailState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    reinitChapterDetailStateAction: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  updateChapterDetailStateAction,
  reinitChapterDetailStateAction,
} = chapterDetailSlice.actions;
export default chapterDetailSlice.reducer;
