import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UiState {
  isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobileMenuOpen: (state: UiState, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleIsMobileMenuOpen: (state: UiState) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const { setIsMobileMenuOpen, toggleIsMobileMenuOpen } = uiSlice.actions;

export const selectIsMobileMenuOpen = (state: RootState) =>
  state.ui.isMobileMenuOpen;

export default uiSlice.reducer;
