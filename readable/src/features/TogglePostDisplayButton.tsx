import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsPostsShownAsCards,
  setIsPostsShownAsCards,
} from '../store/uiSlice';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import * as Icon from 'react-feather';
import { Tooltip } from '@material-ui/core';

interface Props {
  className?: string;
}

const TogglePostDisplayButton = ({ className }: Props) => {
  const dispatch = useDispatch();
  const isPostsShownAsCards = useSelector(selectIsPostsShownAsCards);
  const setPostDisplay = (value: boolean) => {
    dispatch(setIsPostsShownAsCards(value));
  };
  return (
    <ToggleButtonGroup
      value={isPostsShownAsCards}
      exclusive
      onChange={(_event, value) => {
        if (value !== null) {
          setPostDisplay(value);
        }
      }}
      className={className}
    >
      <ToggleButton value={true}>
        <Tooltip title="Display posts in card view">
          <Icon.Grid size={20} />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={false}>
        <Tooltip title="Display posts in list view">
          <Icon.List size={20} />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TogglePostDisplayButton;
