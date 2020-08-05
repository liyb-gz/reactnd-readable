import React from 'react';
import { makeStyles, createStyles, Toolbar, Hidden, } from '@material-ui/core';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
const Main = ({ children }) => {
    const classes = useStyles();
    return (React.createElement("main", { className: classes.content },
        React.createElement(Hidden, { mdUp: true },
            React.createElement(Toolbar, null)),
        children));
};
export default Main;
