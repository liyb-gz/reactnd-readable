import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CategoryProps } from '../types/category';

export type CategoryState = CategoryProps[];

const initialState: CategoryState = [];

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategories: (
      _state: CategoryState,
      action: PayloadAction<CategoryState>
    ) => {
      return action.payload;
    },
  },
});

export const { fetchCategories } = categorySlice.actions;

export const selectCategories = (state: RootState) => {
  return state.categories;
};

export default categorySlice.reducer;
