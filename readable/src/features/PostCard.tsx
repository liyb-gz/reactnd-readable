import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '100%',
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
}: PostProps) => {
  const classes = useStyles();
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const handleClick = useCallback(() => {
    push(`/post/${id}`);
  }, [id, push]);
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick} className={classes.cardActionArea}>
        <CardHeader title={truncate(title, cardTitleLength)} />
        <CardContent className={classes.cardContent}>
          <Typography component="p">
            {truncate(body, cardBodyLength)}
          </Typography>
        </CardContent>
        <CardContent>
          <PostInfo date={date} author={author} voteScore={voteScore} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
