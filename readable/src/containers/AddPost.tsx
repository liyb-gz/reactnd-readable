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
import { addPost } from '../store/postSlice';
import { selectUsername } from '../store/userSlice';
import { timestamp } from '../utils/helpers';
import { useHistory } from 'react-router-dom';

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

  const categories = useSelector(selectCategories);
  const author = useSelector(selectUsername);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    const post: PostProps = {
      author: author || 'Unknown',
      body,
      title,
      category,
      commentCount: 0,
      deleted: false,
      id: id(),
      timestamp: timestamp(),
      voteScore: 1,
    };
    dispatch(addPost(post));
    push('/');
  }, [author, body, title, category, dispatch, push]);
  return (
    <div>
      <Typography variant="h2">Add Post</Typography>
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
            <Button
              color="primary"
              variant="contained"
              className={classes.formControl}
              disabled={
                title.length === 0 || body.length === 0 || category.length === 0
              }
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddPost;
