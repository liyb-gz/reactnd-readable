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
  Grid,
} from '@material-ui/core';
import { format } from 'date-fns';
import { selectComments } from '../store/commentSlice';
import Comment from '../features/Comment';
import * as Icon from 'react-feather';

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
  const allComments = useSelector(selectComments);

  const post = posts[postId];
  const comments = allComments.filter(
    (comment) => comment.parentId === post.id
  );
  const date = format(new Date(post.timestamp), "d MMM y 'at' HH:mm");
  const heartColor = post.voteScore > 0 ? 'red' : 'gray';
  return (
    <div>
      <p>Post: {postId}</p>
      <Typography variant="h3">{post.title}</Typography>
      <Grid container spacing={4}>
        <Grid item>
          <Typography variant="subtitle2">{post.author}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{date}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            <Icon.Heart size={16} color={heartColor} fill={heartColor} />{' '}
            {post.voteScore}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <p>{post.body}</p>
      <Divider className={classes.divider} />
      <Typography variant="h4">Comments</Typography>
      {comments.map((comment) => (
        <Comment {...comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Post;
