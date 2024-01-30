import { FINANCIAL_USER_TOKEN_KEY } from "@/utils/keys";
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";
import { fetchUser, updateUser } from "./userActions";

const userToken = localStorage.getItem(FINANCIAL_USER_TOKEN_KEY);

const initialState = {
  userInfo: {},
  userToken,
  loading: false,
  errors: null,
  success: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(FINANCIAL_USER_TOKEN_KEY);
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.errors = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      })
      // fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.success = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.success = true;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      })
      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
        state.success = false;
      })
  },
});

export const { logout, setCredentials } = userReducer.actions;
export default userReducer.reducer;
