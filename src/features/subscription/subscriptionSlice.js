import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSubscriptions,
  addSubscription,
  deleteSubscription,
  updateSubscription,
} from "./subscriptionActions";

const subscriptionSlice = createSlice({
  name: "subscriptions",
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
      // fetch subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
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

export const { resetError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
