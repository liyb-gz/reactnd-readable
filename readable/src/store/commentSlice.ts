import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { CommentProps } from '../types/comment';
import { adjustPostCommentCount } from './postSlice';

export interface CommentState {
  [id: string]: CommentProps;
}

const initialState: CommentState = {};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchComments: (
      _state: CommentState,
      action: PayloadAction<CommentState>
    ) => {
      return action.payload;
    },
    addComment: (state: CommentState, action: PayloadAction<CommentProps>) => {
      const comment = action.payload;
      state[comment.id] = comment;
    },
  },
});

export const { fetchComments, addComment } = commentSlice.actions;

export const addCommentThunk = (comment: CommentProps): AppThunk => (
  dispatch
) => {
  dispatch(addComment(comment));
  dispatch(adjustPostCommentCount({ id: comment.parentId, diff: 1 }));
};

export const selectCommentState = (state: RootState) => state.comments;
export const selectComments = (state: RootState) => {
  const keys = Object.keys(state.comments);
  return keys.map((key) => state.comments[key]);
};

export default commentSlice.reducer;
