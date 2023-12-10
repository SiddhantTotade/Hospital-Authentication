import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  user_type: "",
  profile_pic: "",
  is_verified: null,
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user_name = action.payload.user_name;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.pincode = action.payload.pincode;
      state.user_type = action.payload.user_type;
      state.profile_pic = action.payload.profile_pic;
      state.is_verified = action.payload.is_verified;
      localStorage.setItem("user_type", action.payload.user_type);
    },
    unsetUserInfo: (state) => {
      state.user_name = initialState.user_name;
      state.first_name = initialState.first_name;
      state.last_name = initialState.last_name;
      state.email = initialState.email;
      state.address = initialState.address;
      state.city = initialState.city;
      state.state = initialState.state;
      state.pincode = initialState.pincode;
      state.profile_pic = initialState.profile_pic;
      state.user_type = initialState.user_type;
      state.is_verified = initialState.is_verified;
      localStorage.removeItem("user_type");
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;
