import { createSlice } from "@reduxjs/toolkit";
import {
	addSubscription,
	deleteSubscription,
	fetchSubscriptions,
	updateSubscription,
} from "./subscriptionsActions";

const initialState = {
	subscriptions: [],
	loading: false,
	error: null,
	success: false,
};

const subscriptionSlice = createSlice({
	name: "subscriptions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetch subscriptions
			.addCase(fetchSubscriptions.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchSubscriptions.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.subscriptions = payload;
				state.success = true;
			})
			.addCase(fetchSubscriptions.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			// add subscription
			.addCase(addSubscription.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(addSubscription.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addSubscription.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// update subscription
			.addCase(updateSubscription.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(updateSubscription.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateSubscription.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
			// delete subscription
			.addCase(deleteSubscription.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(deleteSubscription.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(deleteSubscription.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			});
	},
});

export const selectAllSubscriptions = (state) =>
	state.subscriptions.subscriptions;

export default subscriptionSlice.reducer;
