import React, { useState, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import Logo from '../features/Logo';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

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
      width: 300,
      maxWidth: '100%',
    },
    usernameInput: {
      textAlign: 'center',
    },
    logo: {
      maxWidth: 200,
    },
  })
);

const Login = (props: Props) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(login({ username, token: 'testToken' }));
  }, [dispatch, username]);
  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />
      <Typography variant="subtitle1">Enter a username to login.</Typography>
      <TextField
        className={classes.username}
        inputProps={{ className: classes.usernameInput }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        label="Username"
        autoFocus
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
        disabled={username.length === 0}
      >
        OK
      </Button>
    </div>
  );
};

export default Login;
