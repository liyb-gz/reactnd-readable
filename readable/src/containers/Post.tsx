import React, { useState, useCallback } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPostState,
  deletePostThunk,
  upvotePostThunk,
  downvotePostThunk,
} from '../store/postSlice';
import {
  Typography,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Collapse,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import { format } from 'date-fns';
import { selectCommentState } from '../store/commentSlice';
import Comment from '../features/Comment';
import PostInfo from '../features/PostInfo';
import AddComment from '../features/AddComment';
import { Link as RouterLink } from 'react-router-dom';
import { selectCategories } from '../store/categorySlice';

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

  const { postId, category: categoryPath } = useParams();
  const { push } = useHistory();

  const postState = useSelector(selectPostState);
  const commentState = useSelector(selectCommentState);
  const categories = useSelector(selectCategories);
  const category = categories.find((c) => c.path === categoryPath);

  const [isCommentWindowOpen, setIsCommentWindowOpen] = useState(false);

  const dispatch = useDispatch();

  const handleUpvote = useCallback(() => {
    dispatch(upvotePostThunk({ id: postId }));
  }, [dispatch, postId]);

  const handleDownvote = useCallback(() => {
    dispatch(downvotePostThunk({ id: postId }));
  }, [dispatch, postId]);

  const handleDelete = useCallback(() => {
    dispatch(deletePostThunk({ id: postId }));
    push('/');
  }, [dispatch, postId, push]);

  const post = postState[postId];

  if (post === undefined || category === undefined) {
    return <Redirect to="/404" />;
  }

  const categoryName = category.name;

  const comments = post.comments.map((commentId) => commentState[commentId]);

  comments.sort((a, b) => b.timestamp - a.timestamp);

  const date = format(new Date(post.timestamp), "d MMM y 'at' HH:mm");

  return (
    <div>
      <Breadcrumbs>
        <Link color="inherit" component={RouterLink} to="/" variant="subtitle2">
          Home
        </Link>
        <Link
          color="inherit"
          component={RouterLink}
          to={`/${categoryPath}`}
          variant="subtitle2"
        >
          {categoryName}
        </Link>
        <Typography color="textPrimary" variant="subtitle2">
          Post
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3">{post.title}</Typography>
      <PostInfo
        date={date}
        author={post.author}
        commentCount={post.comments.length}
        voteScore={post.voteScore}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onDelete={handleDelete}
        onEdit={() => push(`/${categoryPath}/${postId}/edit`)}
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
