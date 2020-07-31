import React from 'react';
import {
  Box,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
} from '@material-ui/core';

import TogglePostDisplayButton from '../features/TogglePostDisplayButton';
import PostCardGrid from '../features/PostCardGrid';
import { useSelector } from 'react-redux';
import { selectIsPostsShownAsCards } from '../store/uiSlice';
import PostListGrid from '../features/PostListGrid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > *:first-child': {
        marginLeft: 0,
      },
    },
    cards: {
      marginTop: theme.spacing(4),
    },
    controlBar: {
      display: 'flex',
      justifyItems: 'space-between',
    },
  })
);

interface Props {}

const Home = (props: Props) => {
  const classes = useStyles();
  const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
  return (
    <div>
      <Typography variant="h2">Home</Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box className={classes.chips}>
            <Chip label="Category Name" clickable />
            <Chip label="Category Name" clickable color="primary" />
            <Chip label="Category Name" clickable />
          </Box>
        </Grid>
        <Grid item>
          <TogglePostDisplayButton />
        </Grid>
      </Grid>
      {isPostsShownAsCards ? <PostCardGrid /> : <PostListGrid />}
    </div>
  );
};

export default Home;
