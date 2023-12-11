import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApiService";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "./services/appApiServices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
    auth: authSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, appApi.middleware),
});

setupListeners(store.dispatch);
