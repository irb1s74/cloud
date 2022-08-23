import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  authReducer,
  // [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(authAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
