import React, { useCallback, useState } from 'react';
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';

import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobileMenuOpen } from '../store/uiSlice';
import { selectCategories } from '../store/categorySlice';

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerContainer: {
      overflow: 'auto',
    },
    logo: { width: '100%', padding: theme.spacing(2) },
    active: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.contrastText,
      },

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
    nestedMenuItem: {
      paddingLeft: theme.spacing(6),
      fontSize: theme.typography.body2.fontSize,
    },
  })
);

interface Props {}

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const closeMobileMenu = useCallback(
    () => dispatch(setIsMobileMenuOpen(false)),
    []
  );
  const toggleCategories = useCallback(() => {
    setIsCategoryOpen((currentValue) => !currentValue);
  }, []);
  const categories = useSelector(selectCategories);
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
        <ListItem button onClick={toggleCategories}>
          <ListItemIcon>
            <Icon.Grid size={20} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {isCategoryOpen ? (
            <Icon.ChevronDown size={20} />
          ) : (
            <Icon.ChevronRight size={20} />
          )}
        </ListItem>
        <Collapse in={isCategoryOpen}>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem
                button
                className={classes.nestedMenuItem}
                onClick={closeMobileMenu}
                key={category.name}
                component={NavLink}
                activeClassName={classes.active}
                to={`/categories/${category.path}`}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
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
