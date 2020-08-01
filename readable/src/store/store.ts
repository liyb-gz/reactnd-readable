import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import postReducer from './postSlice';
import categoryReducer from './categorySlice';
import commentReducer from './commentSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    posts: postReducer,
    categories: categoryReducer,
    comments: commentReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
