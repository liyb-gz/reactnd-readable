import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsForPostThunk, deleteComment } from './commentSlice';
import { getAllPosts, getPostsForCategory, postPost, putPost, postNewPost, dropPost, } from '../utils/api';
const initialState = {};
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const post = action.payload;
            state[post.id] = post;
        },
        addCommentToPost: (state, action) => {
            const { commentId, postId } = action.payload;
            state[postId].comments.push(commentId);
        },
        upvotePost: (state, action) => {
            const { id } = action.payload;
            state[id].voteScore += 1;
        },
        downvotePost: (state, action) => {
            const { id } = action.payload;
            state[id].voteScore -= 1;
        },
        deletePost: (state, action) => {
            const { id } = action.payload;
            delete state[id];
        },
        deleteCommentFromPost: (state, action) => {
            const { commentId, postId } = action.payload;
            state[postId].comments = state[postId].comments.filter((id) => id !== commentId);
        },
    },
});
export const { addPost, addCommentToPost, upvotePost, downvotePost, deletePost, deleteCommentFromPost, } = postSlice.actions;
export const deletePostThunk = (postId) => async (dispatch, getState) => {
    const { users, posts } = getState();
    const token = users.token;
    const { id } = postId;
    const originalPost = posts[id];
    const comments = originalPost.comments;
    dispatch(deletePost(postId));
    try {
        await dropPost(id, token);
        comments.forEach((commentId) => dispatch(deleteComment({ id: commentId })));
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(addPost(originalPost));
    }
};
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (categoryPath, { dispatch, getState }) => {
    const { users } = getState();
    const token = users.token;
    try {
        const postsFromAPI = categoryPath === null
            ? await getAllPosts(token)
            : await getPostsForCategory(categoryPath, token);
        await Promise.all(postsFromAPI.map(async (postFromAPI) => {
            const { commentCount, deleted, ...rest } = postFromAPI;
            // Convert PostFromAPI to PostProps
            const post = {
                ...rest,
                comments: [],
            };
            dispatch(addPost(post));
            // Get comments if any
            if (postFromAPI.commentCount > 0) {
                await dispatch(fetchCommentsForPostThunk(post.id));
            }
        }));
    }
    catch (error) {
        console.log('Error: ', error);
    }
    return;
});
export const upvotePostThunk = (postId) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { id } = postId;
    dispatch(upvotePost(postId));
    try {
        await postPost(id, 'upVote', token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(downvotePost(postId));
    }
};
export const downvotePostThunk = (postId) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { id } = postId;
    dispatch(downvotePost(postId));
    try {
        await postPost(id, 'downVote', token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(upvotePost(postId));
    }
};
export const editPostThunk = (post) => async (dispatch, getState) => {
    const { users, posts } = getState();
    const token = users.token;
    const { id: postId, title, body } = post;
    const orginalPost = posts[postId];
    dispatch(addPost(post));
    try {
        await putPost(postId, title, body, token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(addPost(orginalPost));
    }
};
export const addPostThunk = (post) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { comments, voteScore, ...postToAPI } = post;
    console.log('in addPostThunk');
    dispatch(addPost(post));
    try {
        await postNewPost(postToAPI, token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(deletePost({ id: post.id }));
    }
};
export const selectPostState = (state) => state.posts;
export const selectPosts = (state) => {
    return Object.values(state.posts);
};
export default postSlice.reducer;
