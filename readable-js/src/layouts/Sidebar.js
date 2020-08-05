import React from 'react';
import { Drawer, makeStyles, createStyles, Hidden } from '@material-ui/core';
import { drawerWidth } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMobileMenuOpen, setIsMobileMenuOpen } from '../store/uiSlice';
const useStyles = makeStyles(() => createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));
const Sidebar = ({ children }) => {
    const dispatch = useDispatch();
    const closeMobileMenu = () => dispatch(setIsMobileMenuOpen(false));
    const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
    const classes = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Hidden, { smDown: true },
            React.createElement(Drawer, { className: classes.drawer, variant: "permanent", classes: {
                    paper: classes.drawerPaper,
                } }, children)),
        React.createElement(Hidden, { mdUp: true },
            React.createElement(Drawer, { className: classes.drawer, variant: "temporary", classes: {
                    paper: classes.drawerPaper,
                }, open: isMobileMenuOpen, onClose: closeMobileMenu }, children))));
};
export default Sidebar;
