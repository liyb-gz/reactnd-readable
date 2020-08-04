import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { saveLoginData, deleteLoginData } from '../utils/localStorage';

export interface LoginData {
  username: string;
  token: string;
}

interface UserState {
  isLoggedIn: boolean;
  username?: string;
  token?: string;
}

const initialState: UserState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: () => ({
      isLoggedIn: false,
    }),
    login: (state: UserState, action: PayloadAction<LoginData>) => ({
      isLoggedIn: true,
      username: action.payload.username,
      token: action.payload.token,
    }),
  },
});

export const { logout, login } = userSlice.actions;

export const fetchUserDataThunk = (): AppThunk => (dispatch) => {
  const userData = localStorage.getItem('userData');
  if (userData !== null) {
    const { username, token } = JSON.parse(userData);
    dispatch(login({ username, token }));
  }
};

export const loginThunk = (loginData: LoginData): AppThunk => (dispatch) => {
  if (loginData !== null) {
    dispatch(login(loginData));
    saveLoginData(loginData);
  }
};

export const logoutThunk = (): AppThunk => (dispatch) => {
  dispatch(logout());
  deleteLoginData();
};

export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn;

export const selectUsername = (state: RootState) => state.users.username;

export const selectToken = (state: RootState) => state.users.token;

export default userSlice.reducer;
