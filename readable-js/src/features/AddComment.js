import React, { useState, useCallback } from 'react';
import { Grid, Button, makeStyles, createStyles, TextField, } from '@material-ui/core';
import { selectUsername } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as id } from 'uuid';
import { timestamp } from '../utils/helpers';
import { addCommentThunk, selectCommentState, editCommentThunk, } from '../store/commentSlice';
const useStyles = makeStyles((theme) => createStyles({
    button: {
        marginTop: theme.spacing(2),
    },
    comment: {
        '& $formControl': {
            marginTop: theme.spacing(2),
        },
    },
    formControl: {},
}));
const AddComment = ({ postId, commentId, onClose }) => {
    const classes = useStyles();
    const commentState = useSelector(selectCommentState);
    const username = useSelector(selectUsername);
    // Blank new comment
    let comment = {
        author: username,
        parentId: postId,
        body: '',
        id: id(),
        timestamp: timestamp(),
        voteScore: 1,
    };
    if (commentId !== undefined) {
        // Editing existing comment, overwrite initialComment object, except author
        comment = commentState[commentId];
    }
    const [commentBody, setCommentBody] = useState(comment.body);
    const dispatch = useDispatch();
    const handleSubmit = useCallback(() => {
        const commentToSubmit = {
            ...comment,
            body: commentBody,
            timestamp: timestamp(),
        };
        if (commentId === undefined) {
            dispatch(addCommentThunk(commentToSubmit));
        }
        else {
            dispatch(editCommentThunk(commentToSubmit));
        }
        setCommentBody('');
        onClose();
    }, [commentBody, setCommentBody, dispatch, onClose, comment, commentId]);
    return (React.createElement(Grid, { container: true, className: classes.comment },
        React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(TextField, { label: commentId ? 'Edit comment' : 'Add comment', required: true, placeholder: "Leave your comment...", multiline: true, rows: 5, fullWidth: true, autoFocus: true, variant: "outlined", className: classes.formControl, value: commentBody, onChange: (event) => {
                    setCommentBody(event.target.value);
                } })),
        React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true },
                    React.createElement(Button, { variant: "contained", color: "primary", className: classes.button, disabled: commentBody.length === 0, onClick: handleSubmit }, "Submit")),
                React.createElement(Grid, { item: true },
                    React.createElement(Button, { variant: "contained", color: "default", className: classes.button, onClick: onClose }, "Cancel"))))));
};
export default AddComment;
