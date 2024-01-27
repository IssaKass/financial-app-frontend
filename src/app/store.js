import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import osReducer from "../features/os/osSlice";
import projectsReducer from "../features/project/projectSlice";
import subscriptionsReducer from "../features/subscription/subscriptionSlice";
import { authApi } from "../services/auth/authService";

const store = configureStore({
  reducer: {
    os: osReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    projects: projectsReducer,
    subscriptions: subscriptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
