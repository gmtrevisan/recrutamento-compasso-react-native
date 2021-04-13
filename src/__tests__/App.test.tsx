import React from 'react';
import { renderWithRedux } from '../../jestSetup';
import { App } from '../App';

describe('App.test.tsx', () => {
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

  const mockModalState = {
    open: false,
    news: news01,
  };

  test('render buttons', () => {
    const { toJSON } = renderWithRedux(<App />, { initialState: { modalReducer: mockModalState, newsReducer: mockNewsState } });
    expect(toJSON()).toMatchSnapshot();
  });
});