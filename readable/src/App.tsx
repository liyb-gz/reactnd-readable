import React, { useEffect, useCallback } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  CssBaseline,
} from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';

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
import { fetchPostsThunk } from './store/postSlice';
import { fetchCategoriesThunk } from './store/categorySlice';
import { setIsLoading, selectIsLoading } from './store/uiSlice';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import { selectIsLoggedIn, fetchUserDataThunk } from './store/userSlice';

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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  const getLoginData = useCallback(() => {
    dispatch(fetchUserDataThunk());
  }, [dispatch]);

  const getInitialData = useCallback(() => {
    Promise.all([
      dispatch(fetchCategoriesThunk()),
      dispatch(fetchPostsThunk()),
    ]).then(() => {
      dispatch(setIsLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    getLoginData();
  }, [getLoginData]);

  useEffect(() => {
    if (isLoggedIn) {
      getInitialData();
    }
  }, [isLoggedIn, getInitialData]);

  if (!isLoggedIn) {
    return <Login />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
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
          <Route path="/new" component={AddPost} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route path="/:category/:postId/edit" component={AddPost} />
          <Route path="/:category/:postId" component={Post} />
          <Route path="/:category" component={Home} exact />
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Main>
    </div>
  );
};

export default App;
