import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsPostsShownAsCards,
  toggleIsPostsShownAsCards,
} from '../store/uiSlice';

import * as Icon from 'react-feather';
import { IconButton } from '@material-ui/core';

interface Props {}

const TogglePostDisplayButton = (props: Props) => {
  const dispatch = useDispatch();
  const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
  const togglePostDisplay = () => {
    dispatch(toggleIsPostsShownAsCards());
  };
  return (
    <IconButton onClick={togglePostDisplay}>
      {isPostsShownAsCards ? <Icon.Grid size={20} /> : <Icon.List size={20} />}
    </IconButton>
  );
};

export default TogglePostDisplayButton;
