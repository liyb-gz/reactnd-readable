import React from 'react';
import { Grid, Typography, GridSpacing } from '@material-ui/core';
import * as Icon from 'react-feather';

interface Props {
  author: string;
  date: string;
  voteScore: number;
  spacing?: GridSpacing;
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';
}

const PostInfo = ({
  author,
  date,
  voteScore,
  color = 'textPrimary',
  spacing = 4,
}: Props) => {
  const heartColor = voteScore > 0 ? 'red' : 'gray';
  return (
    <Grid container spacing={spacing}>
      <Grid item>
        <Typography variant="subtitle2" color={color}>
          {author}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color={color}>
          {date}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color={color}>
          <Icon.Heart size={16} color={heartColor} fill={heartColor} />{' '}
          {voteScore}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PostInfo;
