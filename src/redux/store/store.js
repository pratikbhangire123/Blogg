import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";

// Created the root reducer separately so we can extract the RootState type.

const rootReducer = combineReducers({
  auth: authSliceReducer,
});

const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export default setupStore;
