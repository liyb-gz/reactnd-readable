import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import postReducer from './postSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    posts: postReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
