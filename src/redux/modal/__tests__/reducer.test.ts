import modalReducer, { initialState } from '../reducer';
import * as actions from '../actions';

describe('Modal.reducer.test.tsx', () => {
  test('initialState', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });
  
  test('setModalOpenAction true/false', () => {
    expect(modalReducer(undefined, actions.setModalOpenAction(true))).toEqual({ ...initialState, open: true });
    expect(modalReducer(undefined, actions.setModalOpenAction(false))).toEqual({ ...initialState, open: false });
  });
  
  test('setModalDataAction', () => {
    const data = {
      _id: 'IdTest',
      abstract: 'AbstracTest',
      web_url: 'WebUrlTest',
      headline: { 
        main: 'MainTest',
      } 
    };
    expect(modalReducer(undefined, actions.setModalNewsAction(data))).toEqual({ ...initialState, news: data });
  });
});