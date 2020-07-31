import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { PostProps } from '../types/post';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/postSlice';
import PostListGrid from '../features/PostListGrid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(1),
    },
    title: {
      display: 'inline-block',
      marginRight: theme.spacing(2),
    },
    time: {
      color: theme.palette.text.secondary,
    },
  })
);

const Categories = (props: PostProps) => {
  const posts = useSelector(selectPosts);
  return (
    <div>
      <Typography variant="h2">Categories</Typography>
      <PostListGrid />
    </div>
  );
};

export default Categories;
