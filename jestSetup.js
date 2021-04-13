import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TestScheduler } from 'rxjs/testing';
import { render } from '@testing-library/react-native';
import { reducers } from './src/redux/store';
import { initialState as initialStateNews } from './src/redux/news/reducer';
import { initialState as initialStateModal } from './src/redux/modal/reducer';

const config = (initialState) => {
    const store = createStore(reducers, initialState);
    store.dispatch = jest.fn();
    return store;
};

export const stateEpic = {
    value: config({
        newsReducer: { ...initialStateNews },
        modalReducer: { ...initialStateModal },
    }).getState(),
};

export const createTestScheduler = () => new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

export function renderWithRedux(ui, { initialState = {}, store = config(initialState) } = {}) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    };
};
