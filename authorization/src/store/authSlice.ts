import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInitState } from "../models/models";

const initialState: AuthInitState = {
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { reducer: authReducer } = authSlice;

export const { actions: authActions } = authSlice;
