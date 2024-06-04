import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    username: '',
    active: false, // Initialize active state
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.auth.username = action.payload;
    },
    setActive: (state, action) => {
      state.auth.active = action.payload;
    },
    logout: (state) => {
      state.auth.username = '';
      state.auth.active = false;
    },
/**
 * ! Use when needed
 *    setUserLoginDetails: (state, action) => { 
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
  },
  */
  },
});

export const { setUsername, setActive, logout } = authSlice.actions;
export default authSlice.reducer;
