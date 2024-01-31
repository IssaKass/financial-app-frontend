import projectsReducer from "@/features/project/projectSlice";
import settingsReducer from "@/features/settings/settingsSlice";
import subscriptionsReducer from "@/features/subscriptions/subscriptionsSlice";
import tasksReducer from "@/features/tasks/taskSlice";
import userReducer from "@/features/user/userSlice";
import { authApi } from "@/services/auth/authService";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		user: userReducer,
		[authApi.reducerPath]: authApi.reducer,
		projects: projectsReducer,
		subscriptions: subscriptionsReducer,
		tasks: tasksReducer,
		settings: settingsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
