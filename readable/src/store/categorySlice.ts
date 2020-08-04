import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { CategoryProps } from '../types/category';
import { getCategories } from '../utils/api';

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
  const token = users.token!;
  try {
    const categories = await getCategories(token);
    dispatch(fetchCategories(categories));
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const selectCategories = (state: RootState) => {
  return state.categories;
};

export default categorySlice.reducer;
