import React from "react";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { setIsMobileMenuOpen } from "../store/uiSlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerContainer: {
      overflow: "auto",
    },
    logo: { width: "100%", padding: theme.spacing(2) },
    active: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.contrastText,
      },

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        "& .MuiListItemIcon-root": {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  })
);

interface Props {}

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const closeMobileMenu = () => dispatch(setIsMobileMenuOpen(false));
  const classes = useStyles();
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem
          button
          onClick={closeMobileMenu}
          component={NavLink}
          activeClassName={classes.active}
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
          onClick={closeMobileMenu}
          component={NavLink}
          activeClassName={classes.active}
          to="/categories"
        >
          <ListItemIcon>
            <Icon.Grid size={20} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem
          button
          onClick={closeMobileMenu}
          component={NavLink}
          activeClassName={classes.active}
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
          onClick={closeMobileMenu}
          component={NavLink}
          activeClassName={classes.active}
          to="/post/new"
        >
          <ListItemIcon>
            <Icon.FilePlus size={20} />
          </ListItemIcon>
          <ListItemText primary="New Post" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Icon.LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarMenu;
