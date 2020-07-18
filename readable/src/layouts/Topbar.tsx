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
  Box,
} from '@material-ui/core';
import * as Icon from 'react-feather';
import { drawerWidth } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // appBar: {
    //   zIndex: theme.zIndex.drawer + 1,
    // },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    logo: {
      height: '100%',
      maxHeight: theme.mixins.toolbar.minHeight || 56 - theme.spacing(1),
      padding: theme.spacing(1),
    },
  })
);

interface Props {}

const Topbar = () => {
  const classes = useStyles();
  return (
    <Hidden mdUp>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
          >
            <Icon.Menu size={20} />
          </IconButton>
          <Box>
            <img
              src="/logo-inverted.svg"
              alt="Readable logo"
              className={classes.logo}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default Topbar;
