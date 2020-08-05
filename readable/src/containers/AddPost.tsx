import React, { useState, ChangeEvent, useCallback } from 'react';
import {
  TextField,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import { v4 as id } from 'uuid';
import { selectCategories } from '../store/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { PostProps } from '../types/post';
import {
  selectPostState,
  editPostThunk,
  addPostThunk,
} from '../store/postSlice';
import { selectUsername } from '../store/userSlice';
import { timestamp } from '../utils/helpers';
import { useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post: {
      '& $formControl': {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {},
  })
);

interface Props {}

const AddPost = () => {
  const classes = useStyles();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const { push } = useHistory();
  const { postId, category: categoryPath } = useParams();
  const { state: categoryPathFromLoc, pathname } = useLocation();

  const categories = useSelector(selectCategories);
  const author = useSelector(selectUsername);
  const postState = useSelector(selectPostState);
  const categoryObj = categories.find((c) => c.path === categoryPath);

  // Blank New Post
  let post: PostProps = {
    author: author!,
    body: '',
    title: '',
    category: (categoryPathFromLoc as string) || '',
    comments: [],
    id: id(),
    timestamp: timestamp(),
    voteScore: 1,
  };

  // Override the default post in edit mode
  if (postId && postState[postId] !== undefined) {
    post = postState[postId];
  }

  const pageTitle = postId ? 'Edit Post' : 'Add Post';

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [category, setCategory] = useState(post.category);

  const dispatch = useDispatch();
  const handleSubmit = useCallback(async () => {
    if (postId) {
      const postToEdit: PostProps = {
        ...post,
        body,
        title,
      };
      dispatch(editPostThunk(postToEdit));
    } else {
      const postToAdd: PostProps = {
        ...post,
        body,
        title,
        category,
        timestamp: timestamp(),
      };
      dispatch(addPostThunk(postToAdd));
    }
    push(`/${category}/${post.id}`);
  }, [body, title, category, dispatch, push, post, postId]);

  // Check if the page contains all the info needed
  let isEditPage: boolean;
  let categoryName: string = '';
  if (pathname.includes('edit')) {
    isEditPage = true;

    if (
      categoryObj === undefined ||
      postState[postId] === undefined ||
      postState[postId].category !== categoryPath
    ) {
      return <Redirect to="/404" />;
    } else {
      categoryName = categoryObj.name;
    }
  } else {
    isEditPage = false;
  }

  return (
    <div>
      <Breadcrumbs>
        <Link color="inherit" component={RouterLink} to="/" variant="subtitle2">
          Home
        </Link>
        {isEditPage && (
          <Link
            color="inherit"
            component={RouterLink}
            to={`/${categoryPath}`}
            variant="subtitle2"
          >
            {categoryName}
          </Link>
        )}
        {isEditPage && (
          <Link
            color="inherit"
            component={RouterLink}
            to={`/${categoryPath}/${postId}`}
            variant="subtitle2"
          >
            Post
          </Link>
        )}
        {isEditPage && (
          <Typography color="textPrimary" variant="subtitle2">
            Edit
          </Typography>
        )}
        {!isEditPage && (
          <Typography color="textPrimary" variant="subtitle2">
            Add new post
          </Typography>
        )}
        )}
      </Breadcrumbs>
      <Typography variant="h2">{pageTitle}</Typography>
      <Grid container>
        <Grid item xs={12}>
          <form className={classes.post}>
            <Grid container spacing={smUp ? 2 : 0}>
              <Grid item sm={9} xs={12}>
                <TextField
                  label="Title"
                  required
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                  required
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(event: ChangeEvent<{ value: unknown }>) => {
                      setCategory(event.target.value as string);
                    }}
                    label="Category"
                    disabled={postId !== undefined}
                  >
                    {categories.map((c) => (
                      <MenuItem value={c.path} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              label="Post"
              required
              placeholder="Write something..."
              multiline
              rows={15}
              fullWidth
              variant="outlined"
              className={classes.formControl}
              value={body}
              onChange={(event) => {
                setBody(event.target.value);
              }}
            />
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.formControl}
                  disabled={
                    title.length === 0 ||
                    body.length === 0 ||
                    category.length === 0
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.formControl}
                  onClick={() => {
                    const path = postId ? `/${category}/${postId}` : '/';
                    push(path);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddPost;
