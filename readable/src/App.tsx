import React, { useEffect, useCallback } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  CssBaseline,
} from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import Topbar from './layouts/Topbar';
import Sidebar from './layouts/Sidebar';
import Main from './layouts/Main';
import SidebarMenu from './features/SidebarMenu';
import Home from './containers/Home';
import Post from './containers/Post';
import AddPost from './containers/AddPost';
import Logo from './features/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { fetchPosts } from './store/postSlice';
import { fetchCategories } from './store/categorySlice';
import { testPosts, testCategories, testComments } from './testData';
import { fetchComments } from './store/commentSlice';
import { setIsLoading, selectIsLoading } from './store/uiSlice';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import { selectIsLoggedIn } from './store/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    logo: {
      padding: theme.spacing(2),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch<typeof store.dispatch>();
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const getInitialData = useCallback(() => {
    dispatch(fetchPosts(testPosts));
    dispatch(fetchCategories(testCategories));
    dispatch(fetchComments(testComments));
    dispatch(setIsLoading(false));
  }, [dispatch]);

  useEffect(() => getInitialData(), [getInitialData]);

  return !isLoggedIn ? (
    <Login />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Sidebar>
        <Logo className={classes.logo} />
        <SidebarMenu />
      </Sidebar>
      <Main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories/:category" component={Home} />
          <Route path="/post/new" component={AddPost} />
          <Route path="/post/:postId" component={Post} exact />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </div>
  );
};

export default App;
