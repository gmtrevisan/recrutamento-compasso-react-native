import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithRedux } from '../../../../jestSetup';
import { NewsList } from '../NewsList';
import * as newsActions from './../../../redux/news/actions';
import * as modalActions from './../../../redux/modal/actions';

describe('NewsList.test.tsx', () => {
  const news01 = {
    _id: '123',
    headline: {
      main: 'NewsTest1'
    },
    web_url: 'WebUrl',
    abstract: 'Abstract',
  };

  const mockNewsState = {
    loading: false,
    error: false,
    news: [news01],
    page: 0,
  };

  test('dispatch fetchNewsAction', () => {
    const { store } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState } } });
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.fetchNewsAction());
  });

  test('render loading', () => {
    const { getByText } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState, loading: true } } });
    expect(getByText("Carregando...")).not.toBe(null);
  });

  test('render error', () => {
    const { getByText } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState, error: true } } });
    expect(getByText("Erro ao carregar, espere alguns segundos e tente novamente.")).not.toBe(null);
  });

  test('render news', () => {
    const { getByText } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState } } });
    expect(getByText("NewsTest1")).not.toBe(null);
  });

  test('dispatch setModalOpenAction on close', () => {
    const { store, getByText } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState } } });
    fireEvent.press(getByText("NewsTest1"));
    expect(store.dispatch).toHaveBeenCalledWith(modalActions.setModalNewsAction(news01));
    expect(store.dispatch).toHaveBeenCalledWith(modalActions.setModalOpenAction(true));
  });
});