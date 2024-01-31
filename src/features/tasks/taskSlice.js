import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks, updateTask } from "./taskActions";

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		tasks: [],
		loading: false,
		error: null,
		success: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetch tasks
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchTasks.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.tasks = payload;
				state.success = true;
			})
			.addCase(fetchTasks.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			// add task
			.addCase(addTask.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(addTask.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addTask.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// update task
			.addCase(updateTask.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(updateTask.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateTask.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// delete task
			.addCase(deleteTask.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(deleteTask.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(deleteTask.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			});
	},
});

export default taskSlice.reducer;
