import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: 0,
  refresh: 0,
};

export const authSlice = createSlice({
  name: "auth_token",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    unsetUserToken: (state) => {
      state.access = initialState.access;
      state.refresh = initialState.refresh;
    },
  },
});

export const { setUserToken, unsetUserToken } = authSlice.actions;

export default authSlice.reducer;
