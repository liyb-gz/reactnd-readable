import React from 'react';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import PostListItem from './PostListItem';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';
import { useParams } from 'react-router-dom';
import { selectPostOrder, PostOrder } from '../store/uiSlice';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
  })
);

const PostListGrid = () => {
  const classes = useStyles();
  const { category } = useParams();
  const postOrder = useSelector(selectPostOrder);
  let posts = useSelector(selectPosts);
  if (category) {
    posts = posts.filter((post) => post.category === category);
  }
  switch (postOrder) {
    case PostOrder.SCORE:
      posts.sort((a, b) => b.voteScore - a.voteScore);
      break;
    case PostOrder.DATE:
      posts.sort((a, b) => b.timestamp - a.timestamp);
      break;
    case PostOrder.COMMENT_COUNT:
      posts.sort((a, b) => b.comments.length - a.comments.length);
  }
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {posts.map((post) => (
          <PostListItem {...post} key={post.id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostListGrid;
