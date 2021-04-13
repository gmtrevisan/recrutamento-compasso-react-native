import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithRedux } from '../../../../jestSetup';
import { NewsDetails } from '../NewsDetails';
import * as modalActions from './../../../redux/modal/actions';
import { Linking } from 'react-native';

describe('NewsDetails.test.tsx', () => {
  const mockModalState = {
    open: true,
    news: {
        _id: 'IdTest',
        abstract: 'AbstracTest',
        web_url: 'WebUrlTest',
        headline: { 
            main: 'MainTest',
        } 
    }
  };

  test('hide modal', () => {
    const { queryByTestId } = renderWithRedux(<NewsDetails />, { initialState: { modalReducer: { ...mockModalState, open: false } } });
    expect(queryByTestId("ModalContainer")).toBeNull();

  });

  test('render news details', () => {
    const { getByText } = renderWithRedux(<NewsDetails />, { initialState: { modalReducer: { ...mockModalState } } });
    expect(getByText("AbstracTest")).not.toBe(null);
    expect(getByText("WebUrlTest")).not.toBe(null);
    expect(getByText("MainTest")).not.toBe(null);
  });

  test('dispatch setModalOpenAction', () => {
    const { getByText, store } = renderWithRedux(<NewsDetails />, { initialState: { modalReducer: { ...mockModalState } } });
    fireEvent.press(getByText("Fechar"));
    expect(store.dispatch).toHaveBeenCalledWith(modalActions.setModalOpenAction(false));
  });

  test('dispatch Linking', () => {
    const linking = jest.spyOn(Linking, 'openURL');
    const { getByText } = renderWithRedux(<NewsDetails />, { initialState: { modalReducer: { ...mockModalState } } });
    fireEvent.press(getByText("Ver notícia"));
    expect(linking).toHaveBeenCalled();
    linking.mockReset();
    linking.mockRestore();
  });
});