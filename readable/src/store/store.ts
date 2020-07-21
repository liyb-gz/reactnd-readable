import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
