import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../utils/api';
const initialState = [];
export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategories: (_state, action) => {
            return action.payload;
        },
    },
});
export const { fetchCategories } = categorySlice.actions;
export const fetchCategoriesThunk = () => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    try {
        const categories = await getCategories(token);
        dispatch(fetchCategories(categories));
    }
    catch (error) {
        console.log('Error: ', error);
    }
};
export const selectCategories = (state) => {
    return state.categories;
};
export default categorySlice.reducer;
