import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { PostProps } from '../types/post';
import { deleteCommentsOfPost } from './commentSlice';

export interface PostState {
  [id: string]: PostProps;
}

export interface AdjustPostCommentCountPayload {
  id: string;
  diff: number;
}

export interface PostId {
  id: string;
}

const initialState: PostState = {};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (_state: PostState, action: PayloadAction<PostState>) => {
      return action.payload;
    },
    addPost: (state: PostState, action: PayloadAction<PostProps>) => {
      const post = action.payload;
      state[post.id] = post;
    },
    upvotePost: (state: PostState, action: PayloadAction<PostId>) => {
      const { id } = action.payload;
      state[id].voteScore += 1;
    },
    downvotePost: (state: PostState, action: PayloadAction<PostId>) => {
      const { id } = action.payload;
      state[id].voteScore -= 1;
    },
    deletePost: (state: PostState, action: PayloadAction<PostId>) => {
      const { id } = action.payload;
      delete state[id];
    },
    adjustPostCommentCount: (
      state: PostState,
      action: PayloadAction<AdjustPostCommentCountPayload>
    ) => {
      const { id, diff } = action.payload;
      state[id].commentCount += diff;
    },
  },
});

export const {
  fetchPosts,
  addPost,
  upvotePost,
  downvotePost,
  deletePost,
  adjustPostCommentCount,
} = postSlice.actions;

export const deletePostThunk = (postId: PostId): AppThunk => (dispatch) => {
  dispatch(deletePost(postId));
  dispatch(deleteCommentsOfPost(postId));
};

export const selectPostState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => {
  const keys = Object.keys(state.posts);
  return keys.map((key) => state.posts[key]);
};

export default postSlice.reducer;
