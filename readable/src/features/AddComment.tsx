import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  TextField,
} from '@material-ui/core';

interface Props {
  onCancel: () => void;
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

const AddComment = ({ onCancel }: Props) => {
  const [newComment, setNewComment] = useState('');
  const classes = useStyles();
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
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
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
              disabled={newComment.length === 0}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              className={classes.addCommentButton}
              onClick={onCancel}
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
