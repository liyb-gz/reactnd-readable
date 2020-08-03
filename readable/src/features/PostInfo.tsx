import React from 'react';
import {
  Grid,
  Typography,
  GridSpacing,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import * as Icon from 'react-feather';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    author: {
      fontWeight: 'bold',
    },
  })
);

interface Props {
  condensed?: boolean;
  author: string;
  date: string;
  voteScore: number;
  spacing?: GridSpacing;
  commentCount?: number;
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
  condensed,
  author,
  date,
  voteScore,
  color = 'textPrimary',
  commentCount,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
}: Props) => {
  const classes = useStyles();
  const heartColor = voteScore > 0 ? 'red' : 'gray';
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const spacing = condensed ? 2 : 4;
  const spacingSm = condensed ? 1 : 2;
  return (
    <Grid container spacing={smUp ? spacing : spacingSm} alignItems="center">
      <Grid item>
        <Typography
          variant="subtitle2"
          color={color}
          className={classes.author}
        >
          {author}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color={color}>
          {date}
        </Typography>
      </Grid>
      {commentCount !== undefined && (
        <Grid item>
          <Typography variant="subtitle2" color={color}>
            <Icon.MessageSquare size={16} /> {commentCount}
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Typography variant="subtitle2" color={color}>
          <Icon.Heart size={16} color={heartColor} fill={heartColor} />{' '}
          {voteScore}
        </Typography>
      </Grid>
      {onUpvote !== undefined && (
        <Grid item>
          <Tooltip title="Upvote">
            <IconButton onClick={onUpvote}>
              <Icon.ThumbsUp size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onDownvote !== undefined && (
        <Grid item>
          <Tooltip title="Downvote">
            <IconButton onClick={onDownvote}>
              <Icon.ThumbsDown size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onEdit !== undefined && (
        <Grid item>
          <Tooltip title="Edit">
            <IconButton onClick={onEdit}>
              <Icon.Edit size={16} />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onDelete !== undefined && (
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
