import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum PostOrder {
  SCORE = 'score',
  DATE = 'date',
}

interface UiState {
  isMobileMenuOpen: boolean;
  isPostsShownAsCards: boolean;
  isLoading: boolean;
  postOrder: PostOrder;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isPostsShownAsCards: true,
  isLoading: true,
  postOrder: PostOrder.SCORE,
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
    setIsLoading: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPostOrder: (state: UiState, action: PayloadAction<PostOrder>) => {
      state.postOrder = action.payload;
    },
  },
});

export const {
  setIsMobileMenuOpen,
  toggleIsMobileMenuOpen,
  setIsPostsShownAsCards,
  toggleIsPostsShownAsCards,
  setIsLoading,
  setPostOrder,
} = uiSlice.actions;

export const selectIsMobileMenuOpen = (state: RootState) =>
  state.ui.isMobileMenuOpen;

export const selectIsPostsShownAsCards = (state: RootState) =>
  state.ui.isPostsShownAsCards;

export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectPostOrder = (state: RootState) => state.ui.postOrder;

export default uiSlice.reducer;
