import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import profileReducer from "./slices/profile.slice";
import myNovelsReducer from "./slices/myNovels.slice";
import novelDetailReducer from "./slices/novelDetail.slice";
import chapterDetailReducer from "./slices/chapterDetail.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    myNovels: myNovelsReducer,
    novelDetail: novelDetailReducer,
    chapterDetail: chapterDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
