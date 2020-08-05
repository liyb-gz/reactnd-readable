import React from 'react';
import { makeStyles, createStyles, Typography, Button, } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(3) * 2}px)`,
        '&> *': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
}));
const NotFound = (props) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Typography, { variant: "h2" }, "Page Not Found."),
        React.createElement(Typography, { variant: "subtitle1" }, "If you entered a web address, check it is correct."),
        React.createElement(Button, { color: "primary", variant: "contained", component: Link, to: "/" }, "Take me home")));
};
export default NotFound;
