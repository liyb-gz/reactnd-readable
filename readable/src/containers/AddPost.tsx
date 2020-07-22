import React from 'react';
import {
  TextField,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
} from '@material-ui/core';

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
  return (
    <div>
      <Typography variant="h2">Add Post</Typography>
      <Grid container>
        <Grid item xs={12}>
          <form className={classes.post}>
            <TextField
              label="Title"
              required
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
            <TextField
              label="Post"
              required
              placeholder="Write something..."
              multiline
              rows={20}
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.formControl}
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
