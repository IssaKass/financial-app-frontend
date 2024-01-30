import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/project/projectSlice";
import subscriptionsReducer from "../features/subscription/subscriptionSlice";
import tasksReducer from "../features/tasks/taskSlice";
import { authApi } from "../services/auth/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    projects: projectsReducer,
    subscriptions: subscriptionsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
