import React, { useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import { format } from "date-fns";
import { useHistory } from "react-router";

interface Props {
  id: string;
  title: string;
  timestamp: number;
  description: string;
}

const PostCard = ({ id, title, timestamp, description }: Props) => {
  const { push } = useHistory();
  const date = format(new Date(timestamp), "d MMM y 'at' HH:mm");
  const handleClick = useCallback(() => {
    push(`/post/${id}`);
  }, [id, push]);
  return (
    <Card>
      <CardHeader title={title} subheader={date} />
      <CardContent>
        <Typography component="p">{description}</Typography>
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