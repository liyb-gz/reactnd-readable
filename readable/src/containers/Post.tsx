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
import { selectComments } from '../store/commentSlice';
import Comment from '../features/Comment';
import PostInfo from '../features/PostInfo';

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
  return (
    <div>
      <p>Post: {postId}</p>
      <Typography variant="h3">{post.title}</Typography>
      <PostInfo date={date} author={post.author} voteScore={post.voteScore} />
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
