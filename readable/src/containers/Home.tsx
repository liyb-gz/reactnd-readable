import React, { useCallback } from 'react';
import {
  Box,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

import TogglePostDisplayButton from '../features/TogglePostDisplayButton';
import PostCardGrid from '../features/PostCardGrid';
import { useSelector } from 'react-redux';
import { selectIsPostsShownAsCards } from '../store/uiSlice';
import PostListGrid from '../features/PostListGrid';
import { selectCategories } from '../store/categorySlice';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import TogglePostSortButton from '../features/TogglePostSortButton';

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
    buttonGroup: {
      marginRight: theme.spacing(2),
    },
    addNewButton: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {}

const Home = () => {
  const classes = useStyles();
  const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
  const categories = useSelector(selectCategories);
  const { category: categoryPath } = useParams();

  // Check if any new posts from the server
  // useEffect(() => {
  //   dispatch(fetchPostsThunk(null));
  // }, [dispatch]);

  const { push } = useHistory();
  const goHome = useCallback(
    (event) => {
      event.preventDefault();
      push('/');
    },
    [push]
  );

  const handleAddNew = useCallback(() => {
    const path = {
      pathname: '/new',
      state: categoryPath,
    };
    push(path);
  }, [categoryPath, push]);

  const shouldRedirectTo404 =
    categoryPath !== undefined &&
    categories.find((c) => c.path === categoryPath) === undefined;

  if (shouldRedirectTo404) {
    return <Redirect to="/404" />;
  }

  const pageTitle = categoryPath
    ? categories.find((c) => c.path === categoryPath)?.name
    : 'Home';

  return (
    <div>
      {categoryPath ? (
        <Typography variant="subtitle2">Category</Typography>
      ) : null}
      <Typography variant="h2">{pageTitle}</Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box className={classes.chips}>
            {categories.map((category) => {
              const isActive = category.path === categoryPath;
              return (
                <Chip
                  label={category.name}
                  clickable
                  component={Link}
                  color={isActive ? 'primary' : 'default'}
                  key={category.name}
                  onDelete={isActive ? goHome : undefined}
                  to={`/${category.path}`}
                />
              );
            })}
          </Box>
        </Grid>
        <Grid item>
          <TogglePostSortButton className={classes.buttonGroup} />
          <TogglePostDisplayButton />
        </Grid>
      </Grid>
      {isPostsShownAsCards ? <PostCardGrid /> : <PostListGrid />}
      <Button
        variant="contained"
        color="primary"
        className={classes.addNewButton}
        onClick={handleAddNew}
      >
        Add new post
      </Button>
    </div>
  );
};

export default Home;
