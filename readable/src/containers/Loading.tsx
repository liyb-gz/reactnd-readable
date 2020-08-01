import React from 'react';
import {
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import Logo from '../features/Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: `calc(100vh - ${theme.spacing(1) * 2}px)`,
    },
    logo: {
      maxWidth: 200,
      marginBottom: theme.spacing(4),
    },
    progress: {
      marginBottom: 100,
    },
  })
);

interface Props {}

const Loading = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default Loading;
