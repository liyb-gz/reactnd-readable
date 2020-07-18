import React, { ReactNode } from 'react';
import {
  Drawer,
  makeStyles,
  createStyles,
  Toolbar,
  Hidden,
} from '@material-ui/core';
import { drawerWidth } from '../utils/constants';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

interface Props {
  children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
