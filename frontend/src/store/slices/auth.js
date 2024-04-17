import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postApi } from "../services/PostService";

const initialState = {
  data: null,
  isAuth: false
}

export const fetch = createAsyncThunk()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: builder => {
    builder
      .addMatcher(postApi.endpoints.fetchLogin.matchFulfilled, (state, action) => {
        state.data = action.payload
        state.isAuth = true
      })
      .addMatcher(postApi.endpoints.fetchAuthMe.matchFulfilled, (state, action) => {
        state.data = action.payload
        state.isAuth = true
      })
      .addMatcher(postApi.endpoints.fetchRegister.matchFulfilled, (state, action) => {
        state.data = action.payload
        state.isAuth = true
      })
  }
})

export const { logout } = authSlice.actions 
export default authSlice.reducer