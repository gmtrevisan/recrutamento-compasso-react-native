import modalReducer, { initialState } from '../reducer';
import * as actions from '../actions';

describe('News.reducer.test.tsx', () => {
  test('initialState', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });

  test('resetNewsAction', () => {
    expect(modalReducer(undefined, actions.resetNewsAction())).toEqual(initialState);
  });

  test('fetchNewsAction', () => {
    expect(modalReducer(undefined, actions.fetchNewsAction())).toEqual({ ...initialState, loading: true });
  });

  test('fetchNewsSuccessAction and sanitizeData', () => {
    const news01 = {
      _id: '123',
      headline: {
        main: 'NewsTest1'
      },
      web_url: 'WebUrl',
      abstract: 'Abstract',
      extraField: 'extraField',
    };
    const news02 = {
      _id: '122',
      headline: {
        main: 'NewsTest2'
      },
      web_url: 'WebUrl',
      abstract: 'Abstract',
      extraField: 'extraField',
      multimedia: [
        {
          subtype: 'thumbnail',
          url: 'url',
        }
      ],
    };
    const news01Sanitize = {
      _id: '123',
      headline: {
        main: 'NewsTest1'
      },
      web_url: 'WebUrl',
      abstract: 'Abstract',
      multimedia: [],
    };
    const news02Sanitize = {
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
    const response = [news01, news02]; 
    expect(modalReducer(undefined, actions.fetchNewsSuccessAction(response))).toEqual({ ...initialState, news: [news01Sanitize, news02Sanitize] });
  });

  test('fetchNewsErrorAction', () => {
    expect(modalReducer(undefined, actions.fetchNewsErrorAction())).toEqual({ ...initialState, error: true });
  });

  test('setNewsPageAction', () => {
    expect(modalReducer(undefined, actions.setNewsPageAction(1))).toEqual({ ...initialState, page: 1 });
  });

  test('setNewsFilterAction', () => {
    expect(modalReducer(undefined, actions.setNewsFilterAction('testFilter'))).toEqual({ ...initialState, filter: 'testFilter' });
  });
});