import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Hidden,
} from '@material-ui/core';

import * as Icon from 'react-feather';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

interface Props {}

const Topbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
          >
            <Icon.Menu size={20} />
          </IconButton>
        </Hidden>
        <Typography variant="h6" noWrap>
          Readable
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
