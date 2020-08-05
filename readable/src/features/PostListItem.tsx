import React, { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { PostProps } from '../types/post';
import { useHistory, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { truncate } from '../utils/helpers';
import { cardBodyLength, cardTitleLength } from '../utils/constants';
import PostInfo from './PostInfo';
import {
  deletePostThunk,
  upvotePostThunk,
  downvotePostThunk,
} from '../store/postSlice';
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
      textDecoration: 'none',
      color: theme.palette.text.primary,
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
  comments,
  category,
}: PostProps) => {
  const { push } = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");

  const handleUpvote = useCallback(() => {
    dispatch(upvotePostThunk({ id }));
  }, [dispatch, id]);

  const handleDownvote = useCallback(() => {
    dispatch(downvotePostThunk({ id }));
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    push(`/${category}/${id}/edit`);
  }, [id, push, category]);

  const handleDelete = useCallback(() => {
    dispatch(deletePostThunk({ id }));
  }, [dispatch, id]);

  return (
    <ListItem divider>
      <ListItemText
        classes={{ secondary: classes.body }}
        secondary={truncate(body, cardBodyLength)}
      >
        <Link to={`/${category}/${id}`} className={classes.titleLink}>
          <Typography variant="h4" component="h4" className={classes.title}>
            {truncate(title, cardTitleLength)}
          </Typography>
        </Link>
        <PostInfo
          date={date}
          author={author}
          commentCount={comments.length}
          voteScore={voteScore}
          color="textSecondary"
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ListItemText>
    </ListItem>
  );
};

export default PostListItem;
