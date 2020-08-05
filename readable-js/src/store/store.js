import { configureStore } from '@reduxjs/toolkit';
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
