import React, { ReactNode } from 'react';
import { Drawer, makeStyles, createStyles, Hidden } from '@material-ui/core';
import { drawerWidth } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMobileMenuOpen, setIsMobileMenuOpen } from '../store/uiSlice';

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
  const dispatch = useDispatch();
  const closeMobileMenu = () => dispatch(setIsMobileMenuOpen(false));
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
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
          open={isMobileMenuOpen}
          onClose={closeMobileMenu}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
