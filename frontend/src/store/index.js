import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./services/PostService.js";
import auth from "./slices/auth.js"

const store = configureStore({
  reducer: {
    auth,
    [postApi.reducerPath]: postApi.reducer
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postApi.middleware)
})

export default store