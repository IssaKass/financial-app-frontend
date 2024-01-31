import { createSlice } from "@reduxjs/toolkit";
import {
	addProject,
	deleteProject,
	fetchProjects,
	updateProject,
} from "./projectActions";

export const PROJECT_STATUS = {
	PENDING: "PENDING",
	PROGRESS: "PROGRESS",
	FINISHED: "FINISHED",
};

const initialState = {
	projects: [],
	loading: false,
	error: null,
	success: false,
};

const projectSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetch projects
			.addCase(fetchProjects.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchProjects.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.projects = payload;
				state.success = true;
			})
			.addCase(fetchProjects.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			// add project
			.addCase(addProject.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(addProject.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addProject.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// update project
			.addCase(updateProject.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(updateProject.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateProject.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// delete project
			.addCase(deleteProject.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(deleteProject.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(deleteProject.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			});
	},
});

export const selectAllProjects = (state) => state.projects.projects;

export const selectProjectById = (state, projectId) => {
	return state.projects.projects.find((project) => project.id === projectId);
};

export default projectSlice.reducer;
