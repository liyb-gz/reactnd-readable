import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import postReducer from './postSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
