import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
  async (userId) => {
    return axios
      .get(`${apiUrl}/api/v1/users/${userId}/subscriptions`)
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

export const addSubscription = createAsyncThunk(
  "subscriptions/addSubscription",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.post(
        `${apiUrl}/api/v1/subscriptions`,
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

export const updateSubscription = createAsyncThunk(
  "subscriptions/updateSubscription",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.put(
        `${apiUrl}/api/v1/subscriptions/${data.id}`,
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

export const deleteSubscription = createAsyncThunk(
  "subscriptions/deleteSubscription",
  async (subscriptionId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const response = await axios.delete(
        `${apiUrl}/api/v1/subscriptions/${subscriptionId}`,
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
