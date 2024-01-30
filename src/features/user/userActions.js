import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchUser = createAsyncThunk(
	"users/fetchUser",
	async (userId) => {
		return axios
			.get(`${apiUrl}/api/v1/users/${userId}`)
			.then((response) => response.data)
			.catch((error) => {
				if (error.response && error.response.data.error) {
					return rejectWithValue(error.response.data.error);
				} else {
					return rejectWithValue(error.message);
				}
			});
	}
);

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async (data, { getState, rejectWithValue }) => {
		try {
			const token = getState().user.userToken;

			const response = await axios.put(`${apiUrl}/api/v1/users/${data.user_id}`, data, {
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
	}
);

