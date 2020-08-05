import React, { useCallback, useState } from 'react';
import { Paper, makeStyles, createStyles, Modal, } from '@material-ui/core';
import { format } from 'date-fns';
import PostInfo from './PostInfo';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk, upvoteCommentThunk, downvoteCommentThunk, } from '../store/commentSlice';
import AddComment from './AddComment';
const useStyles = makeStyles((theme) => createStyles({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    commentBody: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        padding: theme.spacing(3),
    },
}));
const Comment = ({ id, author, body, timestamp, voteScore, parentId, }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleUpvote = useCallback(() => {
        dispatch(upvoteCommentThunk({ id }));
    }, [dispatch, id]);
    const handleDownvote = useCallback(() => {
        dispatch(downvoteCommentThunk({ id }));
    }, [dispatch, id]);
    const handleDelete = useCallback(() => {
        dispatch(deleteCommentThunk({ id }));
    }, [dispatch, id]);
    const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
    return (React.createElement("div", null,
        React.createElement(Paper, { elevation: 3, className: classes.commentBody },
            React.createElement("p", null, body)),
        React.createElement(PostInfo, { date: date, author: author, voteScore: voteScore, color: "textSecondary", onUpvote: handleUpvote, onDownvote: handleDownvote, onDelete: handleDelete, onEdit: () => setIsEditOpen(true) }),
        React.createElement(Modal, { open: isEditOpen, className: classes.modal, disableEnforceFocus: true, onClose: () => setIsEditOpen(false) },
            React.createElement(Paper, { className: classes.modalContent },
                React.createElement(AddComment, { postId: parentId, commentId: id, onClose: () => setIsEditOpen(false) })))));
};
export default Comment;
