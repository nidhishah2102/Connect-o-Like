import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  name: "",
  userid: "",
  profile: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.userid = action.payload.user.user_id;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.profile = action.payload.user.profile;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload.error;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.name = "";
      state.profile = "";
      state.user_id = "";
      state.error = null;
    },
    updateProfilePicture: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logOut, updateProfilePicture } =
  authSlice.actions;

export default authSlice.reducer;
