import React from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => createStyles({
    logo: { width: '100%', maxHeight: '100%', maxWidth: '100%' },
}));
const Logo = (props) => {
    const classes = useStyles();
    return (React.createElement(Box, { className: props.className },
        React.createElement("img", { src: "/logo.svg", className: classes.logo, alt: "Readable logo" })));
};
export default Logo;
