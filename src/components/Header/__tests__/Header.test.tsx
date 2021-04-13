import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithRedux } from '../../../../jestSetup';
import { Header } from '../Header';
import * as newsActions from './../../../redux/news/actions';

describe('Header.test.tsx', () => {
  const mockNewsState = {
    filter: '"Science"'
  };

  test('render buttons', () => {
    const { getByText } = renderWithRedux(<Header />, { initialState: { newsReducer: { ...mockNewsState } } });
    expect(getByText("Ciência")).not.toBe(null);
    expect(getByText("Tecnologia")).not.toBe(null);
  });

  test('dispatch setNewsFilterAction', () => {
    const { getByText, store } = renderWithRedux(<Header />, { initialState: { newsReducer: { ...mockNewsState } } });
    fireEvent.press(getByText("Tecnologia"));
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.setNewsFilterAction('"Technology"'));
  });
});