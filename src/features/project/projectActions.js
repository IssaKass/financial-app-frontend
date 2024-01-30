import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId) => {
    return axios
      .get(`${apiUrl}/api/v1/users/${userId}/projects`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response && error.response.data.error) {
          return rejectWithValue(error.response.data.error);
        } else {
          return rejectWithValue(error.message);
        }
      });
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;

      const response = await axios.post(`${apiUrl}/api/v1/projects`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;

      const response = await axios.put(
        `${apiUrl}/api/v1/projects/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;

      const response = await axios.delete(
        `${apiUrl}/api/v1/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
