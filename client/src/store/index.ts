import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import fileAPI from '../api/FileService';

const rootReducer = combineReducers({
  authReducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(fileAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
