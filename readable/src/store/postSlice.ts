import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { PostProps, PostFromAPI } from '../types/post';
import { deleteCommentsOfPost, addCommentsThunk } from './commentSlice';
import { getAllPosts, getCommentsForPost } from '../utils/api';
import { CommentProps, CommentFromAPI } from '../types/comment';

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
    fetchPosts: (state: PostState, action: PayloadAction<PostProps[]>) => {
      const posts = action.payload;
      posts.forEach((post) => (state[post.id] = post));
    },
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
  fetchPosts,
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

export const fetchPostsThunk = (): AppThunk => async (dispatch, getState) => {
  const { users } = getState();
  const token = users.token!;
  try {
    const postsFromAPI: PostFromAPI[] = await getAllPosts(token);
    const posts: PostProps[] = [];

    postsFromAPI.forEach((postFromAPI) => {
      const { commentCount, deleted, ...rest } = postFromAPI;

      // Convert PostFromAPI to PostProps
      const post: PostProps = {
        ...rest,
        comments: [],
      };

      // Get comments if any
      if (postFromAPI.commentCount > 0) {
        getCommentsForPost(token, post.id).then(
          (commentsFromAPI: CommentFromAPI[]) => {
            // Convert CommentsFromAPI to CommentProps
            const comments: CommentProps[] = commentsFromAPI.map(
              (commentFromAPI) => {
                const { deleted, parentDeleted, ...rest } = commentFromAPI;
                return rest;
              }
            );
            // Add comments to store
            dispatch(addCommentsThunk(comments));
          }
        );
      }

      posts.push(post);
    });

    dispatch(fetchPosts(posts));
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const selectPostState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => {
  return Object.values(state.posts);
};

export default postSlice.reducer;
