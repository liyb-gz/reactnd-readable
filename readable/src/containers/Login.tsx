import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${
        theme.spacing(3) * 2
      }px)`,
      '&> *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      maxWidth: `calc(100vw - ${theme.spacing(3) * 2}px)`,
    },
    username: {
      width: 500,
      maxWidth: '100%',
    },
  })
);

const Login = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">Log in</Typography>
      <TextField
        className={classes.username}
        label="Username"
        placeholder="Enter a username to login."
      />
      <Button color="primary" variant="contained">
        OK
      </Button>
    </div>
  );
};

export default Login;
