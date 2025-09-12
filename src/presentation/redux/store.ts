import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import profileReducer from "./slices/profile.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
