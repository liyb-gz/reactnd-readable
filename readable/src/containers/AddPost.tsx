import React, { useState, ChangeEvent } from 'react';
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
import { selectCategories } from '../store/categorySlice';
import { useSelector } from 'react-redux';

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
  const categories = useSelector(selectCategories);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
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
                      <MenuItem value={c.name} key={c.name}>
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
