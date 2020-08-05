import React from 'react';
import { CircularProgress, makeStyles, createStyles, } from '@material-ui/core';
import Logo from '../features/Logo';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: `calc(100vh - ${theme.spacing(1) * 2}px)`,
    },
    logo: {
        maxWidth: 200,
        marginBottom: theme.spacing(4),
    },
    progress: {
        marginBottom: 100,
    },
}));
const Loading = (props) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Logo, { className: classes.logo }),
        React.createElement(CircularProgress, { className: classes.progress })));
};
export default Loading;
