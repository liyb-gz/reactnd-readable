import React, { ReactNode } from 'react';

import { Drawer, makeStyles, createStyles, Toolbar } from '@material-ui/core';

const drawerWidth = 240;

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
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      {children}
    </Drawer>
  );
};

export default Sidebar;
