import React from 'react';
import { Grid } from '@material-ui/core';
import PostListItem from './PostListItem';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';
import { useParams } from 'react-router-dom';
import { selectPostOrder, PostOrder } from '../store/uiSlice';

interface Props {}

const PostListGrid = () => {
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
    <Grid container>
      <Grid item xs={12}>
        {posts.map((post) => (
          <PostListItem {...post} key={post.id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostListGrid;
