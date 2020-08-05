import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobileMenuOpen } from '../store/uiSlice';
import { selectCategories } from '../store/categorySlice';
import { selectUsername, logoutThunk } from '../store/userSlice';
const useStyles = makeStyles((theme) => createStyles({
    drawerContainer: {
        overflow: 'auto',
    },
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
}));
const SidebarMenu = () => {
    const dispatch = useDispatch();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const categories = useSelector(selectCategories);
    const username = useSelector(selectUsername);
    const classes = useStyles();
    const closeMobileMenu = useCallback(() => dispatch(setIsMobileMenuOpen(false)), [dispatch]);
    const toggleCategories = useCallback(() => {
        setIsCategoryOpen((currentValue) => !currentValue);
    }, []);
    const handleLogout = useCallback(() => {
        dispatch(logoutThunk());
    }, [dispatch]);
    return (React.createElement("div", { className: classes.drawerContainer },
        React.createElement(List, null,
            React.createElement(ListItem, null,
                React.createElement(ListItemText, { primary: `Hello, ${username}!` }))),
        React.createElement(Divider, null),
        React.createElement(List, null,
            React.createElement(ListItem, { button: true, onClick: closeMobileMenu, component: NavLink, activeClassName: classes.active, exact: true, to: "/" },
                React.createElement(ListItemIcon, null,
                    React.createElement(Icon.Home, { size: 20 })),
                React.createElement(ListItemText, { primary: "Home" })),
            React.createElement(ListItem, { button: true, onClick: toggleCategories },
                React.createElement(ListItemIcon, null,
                    React.createElement(Icon.Grid, { size: 20 })),
                React.createElement(ListItemText, { primary: "Categories" }),
                isCategoryOpen ? (React.createElement(Icon.ChevronDown, { size: 20 })) : (React.createElement(Icon.ChevronRight, { size: 20 }))),
            React.createElement(Collapse, { in: isCategoryOpen },
                React.createElement(List, { component: "div", disablePadding: true }, categories.map((category) => (React.createElement(ListItem, { button: true, className: classes.nestedMenuItem, onClick: closeMobileMenu, key: category.name, component: NavLink, activeClassName: classes.active, to: `/${category.path}` },
                    React.createElement(ListItemText, { primary: category.name })))))),
            React.createElement(ListItem, { button: true, onClick: closeMobileMenu, component: NavLink, activeClassName: classes.active, to: "/new" },
                React.createElement(ListItemIcon, null,
                    React.createElement(Icon.FilePlus, { size: 20 })),
                React.createElement(ListItemText, { primary: "New Post" }))),
        React.createElement(Divider, null),
        React.createElement(List, null,
            React.createElement(ListItem, { button: true, onClick: handleLogout },
                React.createElement(ListItemIcon, null,
                    React.createElement(Icon.LogOut, { size: 20 })),
                React.createElement(ListItemText, { primary: "Log out" })))));
};
export default SidebarMenu;
