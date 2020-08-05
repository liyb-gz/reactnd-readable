import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostOrder, setPostOrder, PostOrder } from '../store/uiSlice';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import * as Icon from 'react-feather';
import { Tooltip } from '@material-ui/core';
const TogglePostSortButton = ({ className }) => {
    const dispatch = useDispatch();
    const postOrder = useSelector(selectPostOrder);
    const setPostSort = useCallback((value) => {
        dispatch(setPostOrder(value));
    }, [dispatch]);
    return (React.createElement(ToggleButtonGroup, { value: postOrder, exclusive: true, onChange: (_event, value) => {
            if (value !== null) {
                setPostSort(value);
            }
        }, className: className },
        React.createElement(ToggleButton, { value: PostOrder.SCORE },
            React.createElement(Tooltip, { title: "Sort posts by vote score" },
                React.createElement(Icon.Heart, { size: 20 }))),
        React.createElement(ToggleButton, { value: PostOrder.COMMENT_COUNT },
            React.createElement(Tooltip, { title: "Sort posts by number of comments" },
                React.createElement(Icon.MessageSquare, { size: 20 }))),
        React.createElement(ToggleButton, { value: PostOrder.DATE },
            React.createElement(Tooltip, { title: "Sort posts by publish date" },
                React.createElement(Icon.Calendar, { size: 20 })))));
};
export default TogglePostSortButton;
