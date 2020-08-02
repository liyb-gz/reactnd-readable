import React from 'react';
import { CommentProps } from '../types/comment';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import { format } from 'date-fns';

import PostInfo from './PostInfo';

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
  })
);

const Comment = ({ author, body, timestamp, voteScore }: CommentProps) => {
  const classes = useStyles();
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
      />
    </div>
  );
};

export default Comment;
