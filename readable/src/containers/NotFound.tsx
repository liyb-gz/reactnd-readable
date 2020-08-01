import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
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
    },
  })
);

const NotFound = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2">Page Not Found.</Typography>
      <Typography variant="subtitle1">
        If you entered a web address, check it is correct.
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/">
        Take me home
      </Button>
    </div>
  );
};

export default NotFound;
