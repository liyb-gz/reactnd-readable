import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';

import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { PostProps } from '../types/post';
import { truncate } from '../utils/helpers';
import { cardTitleLength, cardBodyLength } from '../utils/constants';
import PostInfo from './PostInfo';

const PostCard = ({
  id,
  title,
  timestamp,
  body,
  author,
  voteScore,
}: PostProps) => {
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const handleClick = useCallback(() => {
    push(`/post/${id}`);
  }, [id, push]);
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader title={truncate(title, cardTitleLength)} />
        <CardContent>
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
