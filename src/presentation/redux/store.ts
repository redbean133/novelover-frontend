import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import profileReducer from "./slices/profile.slice";
import myNovelsReducer from "./slices/myNovels.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    myNovels: myNovelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
