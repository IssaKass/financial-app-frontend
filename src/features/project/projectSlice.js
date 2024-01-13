import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./projectActions";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
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
        state.data = payload;
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

export const { resetError } = projectSlice.actions;
export default projectSlice.reducer;
