import { createSlice } from '@reduxjs/toolkit';
import { saveLoginData, deleteLoginData } from '../utils/localStorage';
const initialState = {
    isLoggedIn: false,
};
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: () => ({
            isLoggedIn: false,
        }),
        login: (state, action) => ({
            isLoggedIn: true,
            username: action.payload.username,
            token: action.payload.token,
        }),
    },
});
export const { logout, login } = userSlice.actions;
export const fetchUserDataThunk = () => (dispatch) => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
        const { username, token } = JSON.parse(userData);
        dispatch(login({ username, token }));
    }
};
export const loginThunk = (loginData) => (dispatch) => {
    if (loginData !== null) {
        dispatch(login(loginData));
        saveLoginData(loginData);
    }
};
export const logoutThunk = () => (dispatch) => {
    dispatch(logout());
    deleteLoginData();
};
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectUsername = (state) => state.users.username;
export const selectToken = (state) => state.users.token;
export default userSlice.reducer;
