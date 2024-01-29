import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchTasks = createAsyncThunk(
  "projects/fetchTasks",
  async (userId) => {
    return axios
      .get(`${apiUrl}/api/v1/projects/${userId}/tasks`)
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

export const addTask = createAsyncThunk(
  "projects/addTask",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.post(`${apiUrl}/api/v1/tasks`, data, {
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

export const updateTask = createAsyncThunk(
  "projects/updateTask",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.put(
        `${apiUrl}/api/v1/tasks/${data.id}`,
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

export const deleteTask = createAsyncThunk(
  "projects/deleteTask",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.delete(`${apiUrl}/api/v1/tasks/${taskId}`, {
        headers: {
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
