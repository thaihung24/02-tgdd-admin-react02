import { configureStore } from '@reduxjs/toolkit';
// import authReducer from "../slices/authSlice";
// import postReducer from "../slices/postSlice";
import reducers from './reducers';
 
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

