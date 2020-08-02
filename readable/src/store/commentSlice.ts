import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { CommentProps } from '../types/comment';
import { adjustPostCommentCount } from './postSlice';

export interface CommentState {
  [id: string]: CommentProps;
}

export interface CommentVotePayload {
  id: string;
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
    upvoteComment: (
      state: CommentState,
      action: PayloadAction<CommentVotePayload>
    ) => {
      const { id } = action.payload;
      state[id].voteScore += 1;
    },
    downvoteComment: (
      state: CommentState,
      action: PayloadAction<CommentVotePayload>
    ) => {
      const { id } = action.payload;
      state[id].voteScore -= 1;
    },
  },
});

export const {
  fetchComments,
  addComment,
  upvoteComment,
  downvoteComment,
} = commentSlice.actions;

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
