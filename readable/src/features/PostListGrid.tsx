import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import PostListItem from './PostListItem';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      marginTop: theme.spacing(4),
    },
  })
);

interface Props {}

const PostListGrid = () => {
  const posts = useSelector(selectPosts);
  return (
    <Grid container>
      <Grid item xs={12}>
        {posts.map((post) => (
          <PostListItem {...post} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostListGrid;
