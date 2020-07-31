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
import Categories from './containers/Categories';
import Post from './containers/Post';
import AddPost from './containers/AddPost';
import Logo from './features/Logo';
import { useDispatch } from 'react-redux';
import { store } from './store/store';
import { fetchPosts } from './store/postSlice';
import { fetchCategories } from './store/categorySlice';
import { testPosts, testCategories } from './testData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
  const getInitialData = useCallback(() => {
    dispatch(fetchPosts(testPosts));
    dispatch(fetchCategories(testCategories));
  }, []);

  useEffect(() => getInitialData(), []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Sidebar>
        <Logo />
        <SidebarMenu />
      </Sidebar>
      <Main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories/:category" component={Home} />
          <Route path="/post/" component={Post} exact />
          <Route path="/post/new" component={AddPost} />
        </Switch>
      </Main>
    </div>
  );
};

export default App;
