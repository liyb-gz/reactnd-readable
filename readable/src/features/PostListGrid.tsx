import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import PostListItem from './PostListItem';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      marginTop: theme.spacing(4),
    },
  })
);

interface Props {}

const PostListGrid = () => {
  const { category } = useParams();
  let posts = useSelector(selectPosts);
  if (category) {
    posts = posts.filter((post) => post.category === category);
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
