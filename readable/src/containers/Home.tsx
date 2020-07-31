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
import { selectCategories } from '../store/categorySlice';
import { NavLink, useParams } from 'react-router-dom';

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

const Home = () => {
  const classes = useStyles();
  const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
  const categories = useSelector(selectCategories);

  const { category } = useParams();
  return (
    <div>
      {category ? <Typography variant="subtitle2">Category</Typography> : null}
      <Typography variant="h2">{category ? category : 'Home'}</Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box className={classes.chips}>
            {categories.map((category) => (
              <Chip
                label={category.name}
                clickable
                component={NavLink}
                activeClassName="MuiChip-clickableColorPrimary MuiChip-colorPrimary"
                key={category.name}
                to={`/categories/${category.path}`}
              />
            ))}
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
