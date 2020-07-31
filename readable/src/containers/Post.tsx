import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostState } from '../store/postSlice';
import {
  Typography,
  Divider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

interface Props {}

const Post = (props: Props) => {
  const classes = useStyles();
  const { postId } = useParams();
  const posts = useSelector(selectPostState);
  const post = posts[postId];
  const date = format(new Date(post.timestamp), "d MMM y 'at' HH:mm");
  return (
    <div>
      <p>Post: {postId}</p>
      <Typography variant="h3">{post.title}</Typography>
      <Typography variant="subtitle2">
        by {post.author}, {date}
      </Typography>
      <Divider className={classes.divider} />
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
