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
} from '@material-ui/core';
import { v4 as id } from 'uuid';
import { selectCategories } from '../store/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { PostProps } from '../types/post';
import { addPost, selectPostState } from '../store/postSlice';
import { selectUsername } from '../store/userSlice';
import { timestamp } from '../utils/helpers';
import { useHistory, useParams } from 'react-router-dom';

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
  const { postId } = useParams();

  const categories = useSelector(selectCategories);
  const author = useSelector(selectUsername);
  const postState = useSelector(selectPostState);

  // Blank New Post
  let post: PostProps = {
    author: author!,
    body: '',
    title: '',
    category: '',
    comments: [],
    id: id(),
    timestamp: timestamp(),
    voteScore: 1,
  };

  // Override the default post in edit mode, except author
  if (postId) {
    const postToEdit = postState[postId];
    post = {
      ...postToEdit,
      author: post.author,
    };
  }

  const pageTitle = postId ? 'Edit Post' : 'Add Post';

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [category, setCategory] = useState(post.category);

  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    const postToSubmit: PostProps = {
      ...post,
      body,
      title,
      category,
      timestamp: timestamp(),
    };
    dispatch(addPost(postToSubmit));
    push(`/${category}/${postToSubmit.id}`);
  }, [body, title, category, dispatch, push, post]);
  return (
    <div>
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
