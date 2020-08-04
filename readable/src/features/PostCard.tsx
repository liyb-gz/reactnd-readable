import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { PostProps } from '../types/post';
import { truncate } from '../utils/helpers';
import { cardTitleLength, cardBodyLength } from '../utils/constants';
import PostInfo from './PostInfo';
import { upvotePost, downvotePost, deletePostThunk } from '../store/postSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
      textDecoration: 'none',
      color: theme.palette.text.primary,
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
  comments,
  category,
}: PostProps) => {
  const classes = useStyles();
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const dispatch = useDispatch();

  const handleUpvote = useCallback(() => {
    dispatch(upvotePost({ id }));
  }, [dispatch, id]);

  const handleDownvote = useCallback(() => {
    dispatch(downvotePost({ id }));
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    push(`/${category}/${id}/edit`);
  }, [id, push, category]);

  const handleDelete = useCallback(() => {
    dispatch(deletePostThunk({ id }));
  }, [dispatch, id]);

  return (
    <Card className={classes.root}>
      <Link to={`/${category}/${id}`} className={classes.titleLink}>
        <CardHeader title={truncate(title, cardTitleLength)} />
      </Link>
      <CardContent className={classes.cardContent}>
        <Typography component="p">{truncate(body, cardBodyLength)}</Typography>
      </CardContent>
      <CardContent>
        <PostInfo
          condensed
          date={date}
          author={author}
          voteScore={voteScore}
          commentCount={comments.length}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
