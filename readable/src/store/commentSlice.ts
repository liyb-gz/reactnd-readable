import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CommentProps } from '../types/comment';

export interface CommentState {
  [id: string]: CommentProps;
}

const initialState: CommentState = {};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchComments: (
      state: CommentState,
      action: PayloadAction<CommentState>
    ) => {
      return action.payload;
    },
  },
});

export const { fetchComments } = commentSlice.actions;

export const selectCommentState = (state: RootState) => state.comments;
export const selectComments = (state: RootState) => {
  const keys = Object.keys(state.comments);
  return keys.map((key) => state.comments[key]);
};

export default commentSlice.reducer;
