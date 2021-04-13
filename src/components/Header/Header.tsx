import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { desks } from './../../constants';
import { Button, Buttons, Label } from './styles';
import * as newsActions from './../../redux/news/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const selector = useSelector(({ newsReducer }) => newsReducer);
  const { filter } = selector;
  return (
    <Buttons>
      {desks.map(item => (
        <Button key={item.label} onPress={() => dispatch(newsActions.setNewsFilterAction(item.filter))} selected={item.filter === filter}>
          <Label selected={item.filter === filter}>{item.label}</Label>
        </Button>
      ))}
    </Buttons>
  );
};