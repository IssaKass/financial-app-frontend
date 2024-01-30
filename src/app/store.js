import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/project/projectSlice";
import subscriptionsReducer from "../features/subscription/subscriptionSlice";
import tasksReducer from "../features/tasks/taskSlice";
import userReducer from "../features/user/userSlice";
import { authApi } from "../services/auth/authService";

const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    projects: projectsReducer,
    subscriptions: subscriptionsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
