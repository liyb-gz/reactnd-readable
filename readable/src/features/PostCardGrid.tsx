import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';
import { useParams } from 'react-router-dom';
import { selectPostOrder, PostOrder } from '../store/uiSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      marginTop: theme.spacing(4),
    },
  })
);

interface Props {}

const PostCardGrid = () => {
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
  }
  return (
    <Grid container spacing={3} className={classes.cards}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} lg={4} key={post.id}>
          <PostCard {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostCardGrid;
