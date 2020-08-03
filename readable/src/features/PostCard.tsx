import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
} from '@material-ui/core';

import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { PostProps } from '../types/post';
import { truncate } from '../utils/helpers';
import { cardTitleLength, cardBodyLength } from '../utils/constants';
import PostInfo from './PostInfo';
import { upvotePost, downvotePost } from '../store/postSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    titleLink: {
      transition: `color ${theme.transitions.duration.standard}ms`,
      textAlign: 'left',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    cardContent: {
      flexGrow: 1,
    },
  })
);

const PostCard = ({
  id,
  title,
  timestamp,
  body,
  author,
  voteScore,
  commentCount,
  category,
}: PostProps) => {
  const classes = useStyles();
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const dispatch = useDispatch();

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
    <Card className={classes.root}>
      <ButtonBase onClick={handleClick} className={classes.titleLink}>
        <CardHeader title={truncate(title, cardTitleLength)} />
      </ButtonBase>
      <CardContent className={classes.cardContent}>
        <Typography component="p">{truncate(body, cardBodyLength)}</Typography>
      </CardContent>
      <CardContent>
        <PostInfo
          condensed
          date={date}
          author={author}
          voteScore={voteScore}
          commentCount={commentCount}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
