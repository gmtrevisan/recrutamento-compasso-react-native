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
    multimedia: [],
  };

  const news02 = {
    _id: '122',
    headline: {
      main: 'NewsTest2'
    },
    web_url: 'WebUrl',
    abstract: 'Abstract',
    multimedia: [
      {
        subtype: 'thumbnail',
        url: 'url',
      }
    ],
  };

  const mockNewsState = {
    loading: false,
    error: false,
    news: [news01, news02],
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

  test('render error and dispatch resetNewsAction', () => {
    const { store, getByText } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState, error: true } } });
    expect(getByText("Erro ao carregar, espere alguns segundos e tente novamente.")).not.toBe(null);
    fireEvent.press(getByText("Erro ao carregar, espere alguns segundos e tente novamente."));
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.resetNewsAction());
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

  test('handleLoadMore', () => {
    const { store, getByTestId } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState } } });
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(getByTestId("FlatList"), eventData);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.setNewsPageAction(1));
  });

  test('block handleLoadMore when page limit', () => {
    const { store, getByTestId } = renderWithRedux(<NewsList />, { initialState: { newsReducer: { ...mockNewsState, page: 999 } } });
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(getByTestId("FlatList"), eventData);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});