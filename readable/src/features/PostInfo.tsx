import React from 'react';
import {
  Grid,
  Typography,
  GridSpacing,
  IconButton,
  Tooltip,
} from '@material-ui/core';
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
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostInfo = ({
  author,
  date,
  voteScore,
  color = 'textPrimary',
  spacing = 4,
  onEdit,
  onDelete,
}: Props) => {
  const heartColor = voteScore > 0 ? 'red' : 'gray';
  return (
    <Grid container spacing={spacing} alignItems="center">
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
      {onEdit && (
        <Grid item>
          <Tooltip title="Edit">
            <IconButton onClick={onEdit}>
              <Icon.Edit size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onDelete && (
        <Grid item>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <Icon.Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

export default PostInfo;
