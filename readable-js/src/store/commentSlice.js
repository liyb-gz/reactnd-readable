import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCommentToPost, deleteCommentFromPost } from './postSlice';
import { getCommentsForPost, postComment, putComment, postNewComment, dropComment, } from '../utils/api';
const initialState = {};
export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const comment = action.payload;
            state[comment.id] = comment;
        },
        upvoteComment: (state, action) => {
            const { id } = action.payload;
            state[id].voteScore += 1;
        },
        downvoteComment: (state, action) => {
            const { id } = action.payload;
            state[id].voteScore -= 1;
        },
        deleteComment: (state, action) => {
            const { id } = action.payload;
            delete state[id];
        },
    },
});
export const { addComment, upvoteComment, downvoteComment, deleteComment, } = commentSlice.actions;
export const fetchCommentsForPostThunk = createAsyncThunk('comments/fetchCommentsForPost', async (postId, { dispatch, getState }) => {
    const { users } = getState();
    const token = users.token;
    try {
        const commentsFromAPI = await getCommentsForPost(postId, token);
        commentsFromAPI.forEach((commentFromAPI) => {
            const { deleted, parentDeleted, ...comment } = commentFromAPI;
            dispatch(addCommentThunk(comment));
        });
    }
    catch (error) {
        console.log('Error: ', error);
    }
    return;
});
export const addCommentThunk = (comment) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { voteScore, ...commentToAPI } = comment;
    dispatch(addComment(comment));
    dispatch(addCommentToPost({ postId: comment.parentId, commentId: comment.id }));
    try {
        await postNewComment(commentToAPI, token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(deleteComment({ id: comment.id }));
        dispatch(deleteCommentFromPost({ postId: comment.parentId, commentId: comment.id }));
    }
};
export const editCommentThunk = (comment) => async (dispatch, getState) => {
    const { users, comments } = getState();
    const token = users.token;
    const { id: commentId, body, timestamp } = comment;
    const originalComment = comments[commentId];
    dispatch(addComment(comment));
    try {
        await putComment(commentId, body, timestamp, token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(addComment(originalComment));
    }
};
export const upvoteCommentThunk = (commentId) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { id } = commentId;
    dispatch(upvoteComment(commentId));
    try {
        await postComment(id, 'upVote', token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(downvoteComment(commentId));
    }
};
export const downvoteCommentThunk = (commentId) => async (dispatch, getState) => {
    const { users } = getState();
    const token = users.token;
    const { id } = commentId;
    dispatch(downvoteComment(commentId));
    try {
        await postComment(id, 'downVote', token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(upvoteComment(commentId));
    }
};
export const deleteCommentThunk = (commentId) => async (dispatch, getState) => {
    const { users, comments } = getState();
    const token = users.token;
    const { id } = commentId;
    const { parentId } = comments[id];
    const originalComment = comments[id];
    dispatch(deleteComment({ id }));
    dispatch(deleteCommentFromPost({ postId: parentId, commentId: id }));
    try {
        await dropComment(id, token);
    }
    catch (error) {
        console.log('Error: ', error);
        dispatch(addComment(originalComment));
        dispatch(addCommentToPost({ postId: parentId, commentId: id }));
    }
};
export const selectCommentState = (state) => state.comments;
export const selectComments = (state) => {
    return Object.values(state.comments);
};
export default commentSlice.reducer;
