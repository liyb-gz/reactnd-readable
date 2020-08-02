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
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { truncate } from '../utils/helpers';
import { cardBodyLength, cardTitleLength } from '../utils/constants';
import PostInfo from './PostInfo';

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
}: PostProps) => {
  const { push } = useHistory();
  const classes = useStyles();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const handleClick = useCallback(() => {
    push(`/post/${id}`);
  }, [id, push]);
  return (
    <ListItem divider button onClick={handleClick}>
      <ListItemText
        classes={{ secondary: classes.body }}
        secondary={truncate(body, cardBodyLength)}
      >
        <Typography variant="h4" component="h4" className={classes.title}>
          {truncate(title, cardTitleLength)}
        </Typography>
        <PostInfo
          date={date}
          author={author}
          voteScore={voteScore}
          color="textSecondary"
        />
      </ListItemText>
    </ListItem>
  );
};

export default PostListItem;
