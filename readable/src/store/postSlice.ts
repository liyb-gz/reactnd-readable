import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk, AppDispatch } from './store';
import { PostProps, PostFromAPI } from '../types/post';
import {
  deleteCommentsOfPost,
  fetchCommentsForPostThunk,
} from './commentSlice';
import { getAllPosts, getPostsForCategory } from '../utils/api';

export interface PostState {
  [id: string]: PostProps;
}

export interface PostCommentAdjustmentPayload {
  postId: string;
  commentId: string;
}

export interface PostId {
  id: string;
}

const initialState: PostState = {};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state: PostState, action: PayloadAction<PostProps>) => {
      const post = action.payload;
      state[post.id] = post;
    },
    addCommentToPost: (
      state: PostState,
      action: PayloadAction<PostCommentAdjustmentPayload>
    ) => {
      const { commentId, postId } = action.payload;
      state[postId].comments.push(commentId);
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
    deleteCommentFromPost: (
      state: PostState,
      action: PayloadAction<PostCommentAdjustmentPayload>
    ) => {
      const { commentId, postId } = action.payload;
      state[postId].comments = state[postId].comments.filter(
        (id) => id !== commentId
      );
    },
  },
});

export const {
  addPost,
  addCommentToPost,
  upvotePost,
  downvotePost,
  deletePost,
  deleteCommentFromPost,
} = postSlice.actions;

export const deletePostThunk = (postId: PostId): AppThunk => (dispatch) => {
  dispatch(deletePost(postId));
  dispatch(deleteCommentsOfPost(postId));
};

export const fetchPostsThunk = createAsyncThunk<
  void,
  string | null,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('posts/fetchPosts', async (categoryPath, { dispatch, getState }) => {
  const { users } = getState();
  const token = users.token!;
  try {
    const postsFromAPI: PostFromAPI[] =
      categoryPath === null
        ? await getAllPosts(token)
        : await getPostsForCategory(categoryPath, token);

    await Promise.all(
      postsFromAPI.map(async (postFromAPI) => {
        const { commentCount, deleted, ...rest } = postFromAPI;

        // Convert PostFromAPI to PostProps
        const post: PostProps = {
          ...rest,
          comments: [],
        };

        dispatch(addPost(post));

        // Get comments if any
        if (postFromAPI.commentCount > 0) {
          await dispatch(fetchCommentsForPostThunk(post.id));
        }
      })
    );
  } catch (error) {
    console.log('Error: ', error);
  }
  return;
});

export const selectPostState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => {
  return Object.values(state.posts);
};

export default postSlice.reducer;
