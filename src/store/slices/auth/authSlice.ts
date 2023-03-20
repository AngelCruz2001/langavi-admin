import { createSlice } from "@reduxjs/toolkit";
import { startLogin } from "./authThunks";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(startLogin.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
