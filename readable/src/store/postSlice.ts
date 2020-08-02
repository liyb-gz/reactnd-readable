import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PostProps } from '../types/post';

export interface PostState {
  [id: string]: PostProps;
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
  },
});

export const { fetchPosts, addPost } = postSlice.actions;

export const selectPostState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => {
  const keys = Object.keys(state.posts);
  return keys.map((key) => state.posts[key]);
};

export default postSlice.reducer;
