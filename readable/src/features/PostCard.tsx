import React, { useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';

import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { PostProps } from '../types/post';

const PostCard = ({ id, title, timestamp, body }: PostProps) => {
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const handleClick = useCallback(() => {
    push(`/post/${id}`);
  }, [id, push]);
  return (
    <Card>
      <CardHeader title={title} subheader={date} />
      <CardContent>
        <Typography component="p">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleClick}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
