import React from 'react';
import { Grid, Typography, IconButton, Tooltip, useTheme, useMediaQuery, makeStyles, createStyles, } from '@material-ui/core';
import * as Icon from 'react-feather';
const useStyles = makeStyles(() => createStyles({
    author: {
        fontWeight: 'bold',
    },
}));
const PostInfo = ({ condensed, author, date, voteScore, color = 'textPrimary', commentCount, onUpvote, onDownvote, onEdit, onDelete, }) => {
    const classes = useStyles();
    const heartColor = voteScore > 0 ? 'red' : 'gray';
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const spacing = condensed ? 2 : 4;
    const spacingSm = condensed ? 1 : 2;
    return (React.createElement(Grid, { container: true, spacing: smUp ? spacing : spacingSm, alignItems: "center" },
        React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Author name" },
                React.createElement(Typography, { variant: "subtitle2", color: color, className: classes.author }, author))),
        React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Publish date and time" },
                React.createElement(Typography, { variant: "subtitle2", color: color }, date))),
        commentCount !== undefined && (React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Number of comments" },
                React.createElement(Typography, { variant: "subtitle2", color: color },
                    React.createElement(Icon.MessageSquare, { size: 16 }),
                    " ",
                    commentCount)))),
        React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Vote score" },
                React.createElement(Typography, { variant: "subtitle2", color: color },
                    React.createElement(Icon.Heart, { size: 16, color: heartColor, fill: heartColor }),
                    ' ',
                    voteScore))),
        onUpvote !== undefined && (React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Upvote" },
                React.createElement(IconButton, { onClick: onUpvote },
                    React.createElement(Icon.ThumbsUp, { size: 16 }))))),
        onDownvote !== undefined && (React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Downvote" },
                React.createElement(IconButton, { onClick: onDownvote },
                    React.createElement(Icon.ThumbsDown, { size: 16 }))))),
        onEdit !== undefined && (React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Edit" },
                React.createElement(IconButton, { onClick: onEdit },
                    React.createElement(Icon.Edit, { size: 16 }))))),
        onDelete !== undefined && (React.createElement(Grid, { item: true },
            React.createElement(Tooltip, { title: "Delete" },
                React.createElement(IconButton, { onClick: onDelete },
                    React.createElement(Icon.Trash2, { size: 16 })))))));
};
export default PostInfo;
