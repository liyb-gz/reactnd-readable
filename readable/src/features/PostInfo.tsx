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
  onUpvote?: () => void;
  onDownvote?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostInfo = ({
  author,
  date,
  voteScore,
  color = 'textPrimary',
  spacing = 4,
  onUpvote,
  onDownvote,
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
      {onUpvote && (
        <Grid item>
          <Tooltip title="Upvote">
            <IconButton onClick={onUpvote}>
              <Icon.ThumbsUp size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onDownvote && (
        <Grid item>
          <Tooltip title="Downvote">
            <IconButton onClick={onDownvote}>
              <Icon.ThumbsDown size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
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
