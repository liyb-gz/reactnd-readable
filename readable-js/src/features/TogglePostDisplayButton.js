import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsPostsShownAsCards, setIsPostsShownAsCards, } from '../store/uiSlice';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import * as Icon from 'react-feather';
import { Tooltip } from '@material-ui/core';
const TogglePostDisplayButton = ({ className }) => {
    const dispatch = useDispatch();
    const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
    const setPostDisplay = (value) => {
        dispatch(setIsPostsShownAsCards(value));
    };
    return (React.createElement(ToggleButtonGroup, { value: isPostsShownAsCards, exclusive: true, onChange: (_event, value) => {
            if (value !== null) {
                setPostDisplay(value);
            }
        }, className: className },
        React.createElement(ToggleButton, { value: true },
            React.createElement(Tooltip, { title: "Display posts in card view" },
                React.createElement(Icon.Grid, { size: 20 }))),
        React.createElement(ToggleButton, { value: false },
            React.createElement(Tooltip, { title: "Display posts in list view" },
                React.createElement(Icon.List, { size: 20 })))));
};
export default TogglePostDisplayButton;
