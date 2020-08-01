import React from 'react';
import { CommentProps } from '../types/comment';
import {
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import { format } from 'date-fns';

import * as Icon from 'react-feather';

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
  const heartColor = voteScore > 0 ? 'red' : 'gray';
  return (
    <div>
      <Paper elevation={3} className={classes.commentBody}>
        <p>{body}</p>
      </Paper>
      <Grid container spacing={4}>
        <Grid item>
          <Typography variant="subtitle2">{author}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{date}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            <Icon.Heart size={16} color={heartColor} fill={heartColor} />{' '}
            {voteScore}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;
