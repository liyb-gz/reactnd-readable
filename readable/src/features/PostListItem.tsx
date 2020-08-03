import React, { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
} from '@material-ui/core';
import { PostProps } from '../types/post';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { truncate } from '../utils/helpers';
import { cardBodyLength, cardTitleLength } from '../utils/constants';
import PostInfo from './PostInfo';
import { upvotePost, downvotePost } from '../store/postSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(1),
    },
    title: {
      display: 'inline-block',
      marginRight: theme.spacing(2),
    },
    titleLink: {
      transition: `color ${theme.transitions.duration.standard}ms`,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    time: {
      color: theme.palette.text.secondary,
    },
  })
);

const PostListItem = ({
  id,
  title,
  timestamp,
  body,
  author,
  voteScore,
  commentCount,
  category,
}: PostProps) => {
  const { push } = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");

  const handleClick = useCallback(() => {
    push(`/${category}/${id}`);
  }, [id, push, category]);

  const handleUpvote = useCallback(() => {
    dispatch(upvotePost({ id }));
  }, [dispatch, id]);

  const handleDownvote = useCallback(() => {
    dispatch(downvotePost({ id }));
  }, [dispatch, id]);

  return (
    <ListItem divider>
      <ListItemText
        classes={{ secondary: classes.body }}
        secondary={truncate(body, cardBodyLength)}
      >
        <ButtonBase onClick={handleClick} className={classes.titleLink}>
          <Typography variant="h4" component="h4" className={classes.title}>
            {truncate(title, cardTitleLength)}
          </Typography>
        </ButtonBase>
        <PostInfo
          date={date}
          author={author}
          commentCount={commentCount}
          voteScore={voteScore}
          color="textSecondary"
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      </ListItemText>
    </ListItem>
  );
};

export default PostListItem;
