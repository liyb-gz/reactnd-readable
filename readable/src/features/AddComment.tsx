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
import { addComment } from '../store/commentSlice';

interface Props {
  postId: string;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addCommentButton: {
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

const AddComment = ({ postId, onClose }: Props) => {
  const classes = useStyles();
  const [commentBody, setCommentBody] = useState('');
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    const comment: CommentProps = {
      author: username || 'Unknown',
      parentId: postId,
      body: commentBody,
      id: id(),
      timestamp: timestamp(),
      deleted: false,
      parentDeleted: false,
      voteScore: 1,
    };
    dispatch(addComment(comment));
    setCommentBody('');
    onClose();
  }, [postId, username, commentBody, setCommentBody]);
  return (
    <Grid container className={classes.comment}>
      <Grid item xs={12}>
        <TextField
          label="Post"
          required
          placeholder="Leave your comment..."
          multiline
          rows={5}
          fullWidth
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
              className={classes.addCommentButton}
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
              className={classes.addCommentButton}
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
