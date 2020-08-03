import React, { useState, useCallback } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostState, upvotePost, downvotePost } from '../store/postSlice';
import {
  Typography,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Collapse,
} from '@material-ui/core';
import { format } from 'date-fns';
import { selectComments } from '../store/commentSlice';
import Comment from '../features/Comment';
import PostInfo from '../features/PostInfo';
import AddComment from '../features/AddComment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    addCommentButton: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {}

const Post = () => {
  const classes = useStyles();

  const { postId } = useParams();
  const { push } = useHistory();

  const posts = useSelector(selectPostState);
  const allComments = useSelector(selectComments);

  const [isCommentWindowOpen, setIsCommentWindowOpen] = useState(false);

  const dispatch = useDispatch();

  const handleUpvote = useCallback(() => {
    dispatch(upvotePost({ id: postId }));
  }, [dispatch, postId]);

  const handleDownvote = useCallback(() => {
    dispatch(downvotePost({ id: postId }));
  }, [dispatch, postId]);

  const post = posts[postId];

  if (post === undefined) {
    return <Redirect to="/404" />;
  }

  const comments = allComments.filter(
    (comment) => comment.parentId === post.id
  );

  comments.sort((a, b) => b.timestamp - a.timestamp);

  const date = format(new Date(post.timestamp), "d MMM y 'at' HH:mm");

  return (
    <div>
      <p>Post: {postId}</p>
      <Typography variant="h3">{post.title}</Typography>
      <PostInfo
        date={date}
        author={post.author}
        commentCount={post.commentCount}
        voteScore={post.voteScore}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onEdit={() => push(`/${post.category}/${postId}/edit`)}
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
        <AddComment
          postId={postId}
          onClose={() => setIsCommentWindowOpen(false)}
        />
      </Collapse>
    </div>
  );
};

export default Post;
