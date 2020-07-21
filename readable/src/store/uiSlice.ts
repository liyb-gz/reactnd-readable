import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UiState {
  isMobileMenuOpen: boolean;
  isPostsShownAsCards: boolean;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isPostsShownAsCards: true,
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
    setIsPostsShownAsCards: (
      state: UiState,
      action: PayloadAction<boolean>
    ) => {
      state.isPostsShownAsCards = action.payload;
    },
    toggleIsPostsShownAsCards: (state: UiState) => {
      state.isPostsShownAsCards = !state.isPostsShownAsCards;
    },
  },
});

export const {
  setIsMobileMenuOpen,
  toggleIsMobileMenuOpen,
  setIsPostsShownAsCards,
  toggleIsPostsShownAsCards,
} = uiSlice.actions;

export const selectIsMobileMenuOpen = (state: RootState) =>
  state.ui.isMobileMenuOpen;

export const selectIsPostsShownAsCards = (state: RootState) =>
  state.ui.isPostsShownAsCards;

export default uiSlice.reducer;
