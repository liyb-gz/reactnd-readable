import React, { useState, useCallback } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  TextField,
} from '@material-ui/core';
import { CommentProps } from '../types/comment';
import { selectUsername } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as id } from 'uuid';
import { timestamp } from '../utils/helpers';
import {
  addCommentThunk,
  selectCommentState,
  editCommentThunk,
} from '../store/commentSlice';

interface Props {
  postId: string;
  commentId?: string;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
    },
    comment: {
      '& $formControl': {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {},
  })
);

const AddComment = ({ postId, commentId, onClose }: Props) => {
  const classes = useStyles();
  const commentState = useSelector(selectCommentState);
  const username = useSelector(selectUsername);

  // Blank new comment
  let comment: CommentProps = {
    author: username || 'Unknown',
    parentId: postId,
    body: '',
    id: id(),
    timestamp: timestamp(),
    deleted: false,
    parentDeleted: false,
    voteScore: 1,
  };

  if (commentId !== undefined) {
    // Editing existing comment, overwrite initialComment object, except author
    comment = {
      ...commentState[commentId],
      author: comment.author,
    };
  }
  const [commentBody, setCommentBody] = useState(comment.body);

  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    const commentToSubmit: CommentProps = {
      ...comment,
      body: commentBody,
      timestamp: timestamp(),
    };

    if (commentId === undefined) {
      dispatch(addCommentThunk(commentToSubmit));
    } else {
      dispatch(editCommentThunk(commentToSubmit));
    }

    setCommentBody('');
    onClose();
  }, [commentBody, setCommentBody, dispatch, onClose, comment, commentId]);
  return (
    <Grid container className={classes.comment}>
      <Grid item xs={12}>
        <TextField
          label={commentId ? 'Edit comment' : 'Add comment'}
          required
          placeholder="Leave your comment..."
          multiline
          rows={5}
          fullWidth
          autoFocus
          variant="outlined"
          className={classes.formControl}
          value={commentBody}
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={commentBody.length === 0}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddComment;
