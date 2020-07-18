import React from 'react';
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { Inbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons';
import * as Icon from 'react-feather';

const useStyles = makeStyles(() =>
  createStyles({
    drawerContainer: {
      overflow: 'auto',
    },
  })
);

interface Props {}

const SidebarMenu = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem
          button
          component={NavLink}
          activeClassName="Mui-selected"
          exact
          to="/"
        >
          <ListItemIcon>
            <Icon.Home size={20} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeClassName="Mui-selected"
          to="/categories"
        >
          <ListItemIcon>
            <Icon.Grid size={20} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeClassName="Mui-selected"
          exact
          to="/post"
        >
          <ListItemIcon>
            <Icon.FileText size={20} />
          </ListItemIcon>
          <ListItemText primary="Post" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeClassName="Mui-selected"
          to="/post/new"
        >
          <ListItemIcon>
            <Icon.FilePlus size={20} />
          </ListItemIcon>
          <ListItemText primary="New Post" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarMenu;
