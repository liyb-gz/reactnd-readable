import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface LoginData {
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

export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn;

export const selectUsername = (state: RootState) => state.users.username;

export const selectToken = (state: RootState) => state.users.token;

export default userSlice.reducer;
