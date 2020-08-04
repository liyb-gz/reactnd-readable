import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
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

export const fetchCategoriesThunk = (): AppThunk => async (
  dispatch,
  getState
) => {
  const { users } = getState();
  const token = users.token || 'TOKEN';
  const response = await fetch('http://localhost:3001/categories', {
    headers: { Authorization: token },
  });
  if (response.ok) {
    const { categories } = await response.json();
    dispatch(fetchCategories(categories));
  }
};

export const selectCategories = (state: RootState) => {
  return state.categories;
};

export default categorySlice.reducer;
