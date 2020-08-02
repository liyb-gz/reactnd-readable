import React, { useState } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostState } from '../store/postSlice';
import {
  Typography,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Grid,
  TextField,
  Fade,
  Collapse,
} from '@material-ui/core';
import { format } from 'date-fns';
import { selectComments } from '../store/commentSlice';
import Comment from '../features/Comment';
import PostInfo from '../features/PostInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    addCommentButton: {
      marginTop: theme.spacing(2),
    },
    comment: {
      '& $formControl': {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {},
  })
);

interface Props {}

const Post = (props: Props) => {
  const classes = useStyles();
  const { postId } = useParams();
  const { push } = useHistory();
  const posts = useSelector(selectPostState);
  const allComments = useSelector(selectComments);
  const [newComment, setNewComment] = useState('');
  const [isCommentWindowOpen, setIsCommentWindowOpen] = useState(false);

  const post = posts[postId];

  if (post === undefined) {
    return <Redirect to="/404" />;
  }

  const comments = allComments.filter(
    (comment) => comment.parentId === post.id
  );

  const date = format(new Date(post.timestamp), "d MMM y 'at' HH:mm");

  return (
    <div>
      <p>Post: {postId}</p>
      <Typography variant="h3">{post.title}</Typography>
      <PostInfo
        date={date}
        author={post.author}
        voteScore={post.voteScore}
        onEdit={() => push(`/post/${postId}/edit`)}
      />
      <Divider className={classes.divider} />
      <p>{post.body}</p>
      <Divider className={classes.divider} />
      <Typography variant="h4">Comments</Typography>
      {comments.map((comment) => (
        <Comment {...comment} key={comment.id} />
      ))}
      <Collapse in={!isCommentWindowOpen}>
        <Button
          variant="contained"
          color="primary"
          className={classes.addCommentButton}
          onClick={() => setIsCommentWindowOpen(true)}
        >
          Add comment
        </Button>
      </Collapse>
      <Collapse in={isCommentWindowOpen}>
        <Grid container className={classes.comment}>
          <Grid item xs={12}>
            <TextField
              label="Post"
              required
              placeholder="Leave your comment..."
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              className={classes.formControl}
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addCommentButton}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.addCommentButton}
                  onClick={() => setIsCommentWindowOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
};

export default Post;
