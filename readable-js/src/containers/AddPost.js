import React, { useState, useCallback } from 'react';
import { TextField, Grid, makeStyles, createStyles, Button, Typography, FormControl, InputLabel, Select, MenuItem, useMediaQuery, useTheme, Breadcrumbs, Link, } from '@material-ui/core';
import { v4 as id } from 'uuid';
import { selectCategories } from '../store/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostState, editPostThunk, addPostThunk, } from '../store/postSlice';
import { selectUsername } from '../store/userSlice';
import { timestamp } from '../utils/helpers';
import { useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => createStyles({
    post: {
        '& $formControl': {
            marginTop: theme.spacing(2),
        },
    },
    formControl: {},
}));
const AddPost = () => {
    const classes = useStyles();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const { push } = useHistory();
    const { postId, category: categoryPath } = useParams();
    const { state: categoryPathFromLoc, pathname } = useLocation();
    const categories = useSelector(selectCategories);
    const author = useSelector(selectUsername);
    const postState = useSelector(selectPostState);
    const categoryObj = categories.find((c) => c.path === categoryPath);
    // Blank New Post
    let post = {
        author: author,
        body: '',
        title: '',
        category: categoryPathFromLoc || '',
        comments: [],
        id: id(),
        timestamp: timestamp(),
        voteScore: 1,
    };
    // Override the default post in edit mode
    if (postId && postState[postId] !== undefined) {
        post = postState[postId];
    }
    const pageTitle = postId ? 'Edit Post' : 'Add Post';
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [category, setCategory] = useState(post.category);
    const dispatch = useDispatch();
    const handleSubmit = useCallback(async () => {
        if (postId) {
            const postToEdit = {
                ...post,
                body,
                title,
            };
            dispatch(editPostThunk(postToEdit));
        }
        else {
            const postToAdd = {
                ...post,
                body,
                title,
                category,
                timestamp: timestamp(),
            };
            dispatch(addPostThunk(postToAdd));
        }
        push(`/${category}/${post.id}`);
    }, [body, title, category, dispatch, push, post, postId]);
    // Check if the page contains all the info needed
    let isEditPage;
    let categoryName = '';
    if (pathname.includes('edit')) {
        isEditPage = true;
        if (categoryObj === undefined ||
            postState[postId] === undefined ||
            postState[postId].category !== categoryPath) {
            return React.createElement(Redirect, { to: "/404" });
        }
        else {
            categoryName = categoryObj.name;
        }
    }
    else {
        isEditPage = false;
    }
    return (React.createElement("div", null,
        React.createElement(Breadcrumbs, null,
            React.createElement(Link, { color: "inherit", component: RouterLink, to: "/", variant: "subtitle2" }, "Home"),
            isEditPage && (React.createElement(Link, { color: "inherit", component: RouterLink, to: `/${categoryPath}`, variant: "subtitle2" }, categoryName)),
            isEditPage && (React.createElement(Link, { color: "inherit", component: RouterLink, to: `/${categoryPath}/${postId}`, variant: "subtitle2" }, "Post")),
            isEditPage && (React.createElement(Typography, { color: "textPrimary", variant: "subtitle2" }, "Edit")),
            !isEditPage && (React.createElement(Typography, { color: "textPrimary", variant: "subtitle2" }, "Add new post")),
            ")}"),
        React.createElement(Typography, { variant: "h2" }, pageTitle),
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement("form", { className: classes.post },
                    React.createElement(Grid, { container: true, spacing: smUp ? 2 : 0 },
                        React.createElement(Grid, { item: true, sm: 9, xs: 12 },
                            React.createElement(TextField, { label: "Title", required: true, fullWidth: true, variant: "outlined", className: classes.formControl, value: title, onChange: (event) => {
                                    setTitle(event.target.value);
                                } })),
                        React.createElement(Grid, { item: true, sm: 3, xs: 12 },
                            React.createElement(FormControl, { variant: "outlined", className: classes.formControl, fullWidth: true, required: true },
                                React.createElement(InputLabel, null, "Category"),
                                React.createElement(Select, { value: category, onChange: (event) => {
                                        setCategory(event.target.value);
                                    }, label: "Category", disabled: postId !== undefined }, categories.map((c) => (React.createElement(MenuItem, { value: c.path, key: c.name }, c.name))))))),
                    React.createElement(TextField, { label: "Post", required: true, placeholder: "Write something...", multiline: true, rows: 15, fullWidth: true, variant: "outlined", className: classes.formControl, value: body, onChange: (event) => {
                            setBody(event.target.value);
                        } }),
                    React.createElement(Grid, { container: true, spacing: 2 },
                        React.createElement(Grid, { item: true },
                            React.createElement(Button, { color: "primary", variant: "contained", className: classes.formControl, disabled: title.length === 0 ||
                                    body.length === 0 ||
                                    category.length === 0, onClick: handleSubmit }, "Submit")),
                        React.createElement(Grid, { item: true },
                            React.createElement(Button, { variant: "contained", color: "default", className: classes.formControl, onClick: () => {
                                    const path = postId ? `/${category}/${postId}` : '/';
                                    push(path);
                                } }, "Cancel"))))))));
};
export default AddPost;
