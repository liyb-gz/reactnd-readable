import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostOrder, setPostOrder, PostOrder } from '../store/uiSlice';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import * as Icon from 'react-feather';
import { Tooltip } from '@material-ui/core';

interface Props {
  className?: string;
}

const TogglePostSortButton = ({ className }: Props) => {
  const dispatch = useDispatch();
  const postOrder = useSelector(selectPostOrder);
  const setPostSort = useCallback(
    (value: PostOrder) => {
      dispatch(setPostOrder(value));
    },
    [dispatch]
  );
  return (
    <ToggleButtonGroup
      value={postOrder}
      exclusive
      onChange={(_event, value) => {
        if (value !== null) {
          setPostSort(value);
        }
      }}
      className={className}
    >
      <ToggleButton value={PostOrder.SCORE}>
        <Tooltip title="Sort posts by vote score">
          <Icon.Heart size={20} />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={PostOrder.DATE}>
        <Tooltip title="Sort posts by publish date">
          <Icon.Calendar size={20} />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TogglePostSortButton;
