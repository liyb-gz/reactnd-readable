import React from 'react';
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

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
        <ListItem button>
          <ListItemIcon>
            <Icon.Home size={20} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SidebarMenu;
