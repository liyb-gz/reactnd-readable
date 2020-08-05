import React, { useEffect, useCallback } from 'react';
import { makeStyles, createStyles, CssBaseline, } from '@material-ui/core';
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
import { fetchPostsThunk } from './store/postSlice';
import { fetchCategoriesThunk } from './store/categorySlice';
import { setIsLoading, selectIsLoading } from './store/uiSlice';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import { selectIsLoggedIn, fetchUserDataThunk } from './store/userSlice';
const useStyles = makeStyles((theme) => createStyles({
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
}));
const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const getLoginData = useCallback(() => {
        dispatch(fetchUserDataThunk());
    }, [dispatch]);
    const getInitialData = useCallback(() => {
        Promise.all([
            dispatch(fetchCategoriesThunk()),
            dispatch(fetchPostsThunk(null)),
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
        return React.createElement(Login, null);
    }
    if (isLoading) {
        return React.createElement(Loading, null);
    }
    return (React.createElement("div", { className: classes.root },
        React.createElement(CssBaseline, null),
        React.createElement(Topbar, null),
        React.createElement(Sidebar, null,
            React.createElement(Logo, { className: classes.logo }),
            React.createElement(SidebarMenu, null)),
        React.createElement(Main, null,
            React.createElement(Switch, null,
                React.createElement(Route, { path: "/", exact: true, component: Home }),
                React.createElement(Route, { path: "/new", exact: true, component: AddPost }),
                React.createElement(Route, { path: "/404", exact: true, component: NotFound }),
                React.createElement(Route, { path: "/:category/:postId/edit", component: AddPost }),
                React.createElement(Route, { path: "/:category/:postId", component: Post }),
                React.createElement(Route, { path: "/:category", component: Home, exact: true }),
                React.createElement(Route, null,
                    React.createElement(Redirect, { to: "/404" }))))));
};
export default App;
