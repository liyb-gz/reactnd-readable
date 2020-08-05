import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk, AppDispatch } from './store';
import { CommentProps, CommentFromAPI } from '../types/comment';
import { addCommentToPost, deleteCommentFromPost } from './postSlice';
import {
  getCommentsForPost,
  postComment,
  putComment,
  postNewComment,
  dropComment,
} from '../utils/api';

export interface CommentState {
  [id: string]: CommentProps;
}

export interface CommentId {
  id: string;
}

const initialState: CommentState = {};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentState, action: PayloadAction<CommentProps>) => {
      const comment = action.payload;
      state[comment.id] = comment;
    },
    upvoteComment: (state: CommentState, action: PayloadAction<CommentId>) => {
      const { id } = action.payload;
      state[id].voteScore += 1;
    },
    downvoteComment: (
      state: CommentState,
      action: PayloadAction<CommentId>
    ) => {
      const { id } = action.payload;
      state[id].voteScore -= 1;
    },
    deleteComment: (state: CommentState, action: PayloadAction<CommentId>) => {
      const { id } = action.payload;
      delete state[id];
    },
  },
});

export const {
  addComment,
  upvoteComment,
  downvoteComment,
  deleteComment,
} = commentSlice.actions;

export const fetchCommentsForPostThunk = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('comments/fetchCommentsForPost', async (postId, { dispatch, getState }) => {
  const { users } = getState();
  const token = users.token!;
  try {
    const commentsFromAPI: CommentFromAPI[] = await getCommentsForPost(
      postId,
      token
    );
    commentsFromAPI.forEach((commentFromAPI) => {
      const { deleted, parentDeleted, ...comment } = commentFromAPI;
      dispatch(addCommentThunk(comment));
    });
  } catch (error) {
    console.log('Error: ', error);
  }
  return;
});

export const addCommentThunk = (comment: CommentProps): AppThunk => async (
  dispatch,
  getState
) => {
  const { users } = getState();
  const token = users.token!;

  const { voteScore, ...commentToAPI } = comment;

  dispatch(addComment(comment));
  dispatch(
    addCommentToPost({ postId: comment.parentId, commentId: comment.id })
  );
  try {
    await postNewComment(commentToAPI, token);
  } catch (error) {
    console.log('Error: ', error);
    dispatch(deleteComment({ id: comment.id }));
    dispatch(
      deleteCommentFromPost({ postId: comment.parentId, commentId: comment.id })
    );
  }
};

export const editCommentThunk = (comment: CommentProps): AppThunk => async (
  dispatch,
  getState
) => {
  const { users, comments } = getState();
  const token = users.token!;

  const { id: commentId, body, timestamp } = comment;
  const originalComment = comments[commentId];

  dispatch(addComment(comment));
  try {
    await putComment(commentId, body, timestamp, token);
  } catch (error) {
    console.log('Error: ', error);
    dispatch(addComment(originalComment));
  }
};

export const upvoteCommentThunk = (commentId: CommentId): AppThunk => async (
  dispatch,
  getState
) => {
  const { users } = getState();
  const token = users.token!;

  const { id } = commentId;
  dispatch(upvoteComment(commentId));
  try {
    await postComment(id, 'upVote', token);
  } catch (error) {
    console.log('Error: ', error);
    dispatch(downvoteComment(commentId));
  }
};

export const downvoteCommentThunk = (commentId: CommentId): AppThunk => async (
  dispatch,
  getState
) => {
  const { users } = getState();
  const token = users.token!;

  const { id } = commentId;
  dispatch(downvoteComment(commentId));
  try {
    await postComment(id, 'downVote', token);
  } catch (error) {
    console.log('Error: ', error);
    dispatch(upvoteComment(commentId));
  }
};

export const deleteCommentThunk = (commentId: CommentId): AppThunk => async (
  dispatch,
  getState
) => {
  const { users, comments } = getState();
  const token = users.token!;

  const { id } = commentId;
  const { parentId } = comments[id];

  const originalComment = comments[id];

  dispatch(deleteComment({ id }));
  dispatch(deleteCommentFromPost({ postId: parentId, commentId: id }));
  try {
    await dropComment(id, token);
  } catch (error) {
    console.log('Error: ', error);
    dispatch(addComment(originalComment));
    dispatch(addCommentToPost({ postId: parentId, commentId: id }));
  }
};

export const selectCommentState = (state: RootState) => state.comments;
export const selectComments = (state: RootState) => {
  return Object.values(state.comments);
};

export default commentSlice.reducer;
