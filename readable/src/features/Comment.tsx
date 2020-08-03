import React, { useCallback, useState } from 'react';
import { CommentProps } from '../types/comment';
import {
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Modal,
} from '@material-ui/core';
import { format } from 'date-fns';

import PostInfo from './PostInfo';
import { useDispatch } from 'react-redux';
import {
  upvoteComment,
  downvoteComment,
  deleteCommentThunk,
} from '../store/commentSlice';
import AddComment from './AddComment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const Comment = ({
  id,
  author,
  body,
  timestamp,
  voteScore,
  parentId,
}: CommentProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpvote = useCallback(() => {
    dispatch(upvoteComment({ id }));
  }, [dispatch, id]);

  const handleDownvote = useCallback(() => {
    dispatch(downvoteComment({ id }));
  }, [dispatch, id]);

  const handleDelete = useCallback(() => {
    dispatch(deleteCommentThunk({ id }));
  }, [dispatch, id]);

  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  return (
    <div>
      <Paper elevation={3} className={classes.commentBody}>
        <p>{body}</p>
      </Paper>
      <PostInfo
        date={date}
        author={author}
        voteScore={voteScore}
        color="textSecondary"
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onDelete={handleDelete}
        onEdit={() => setIsEditOpen(true)}
      />
      <Modal
        open={isEditOpen}
        className={classes.modal}
        disableEnforceFocus
        onClose={() => setIsEditOpen(false)}
      >
        <Paper className={classes.modalContent}>
          <AddComment
            postId={parentId}
            commentId={id}
            onClose={() => setIsEditOpen(false)}
          />
        </Paper>
      </Modal>
    </div>
  );
};

export default Comment;
