import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import newsReducer from './news/reducer';
import modalReducer from './modal/reducer';
import * as newsEpics from './news/epics';

const epics = [
  ...Object.values(newsEpics),
];

const rootEpic = combineEpics(...epics);

export const reducers = combineReducers({
  newsReducer,
  modalReducer,
});

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware({ dependencies: { ajax } });
  const middleware = [epicMiddleware];
  const store = createStore(
      reducers,
      compose(applyMiddleware(...middleware)),
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export const store = configureStore();
