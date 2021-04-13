import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { apiKey } from './../../constants';
import * as actions from './actions';

const fetchNewsAjax = (state$) => {
  const newsReducer = state$.value['newsReducer'];
  const { page, filter } = newsReducer;
  return {
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}=news_desk:(${filter})&page=${page}`,
    method: 'GET',
    responseType: 'json',
  };
};

export const fetchNewsEpic = (action$, state$, { ajax }) => (
  action$.pipe(
    ofType(actions.fetchNewsAction().type),
    mergeMap(() => ajax(fetchNewsAjax(state$)).pipe(
    mergeMap((response) => of(
      actions.fetchNewsSuccessAction(response.response),
    )),
    catchError(() => of(
      actions.fetchNewsErrorAction(),
    )),
  )),
));

export const setNewsPageEpic = (action$) => (
  action$.pipe(
    ofType(actions.setNewsPageAction().type),
    mergeMap(() => of(actions.fetchNewsAction())),
  )
);

export const setNewsFilterEpic = (action$) => (
  action$.pipe(
    ofType(actions.setNewsFilterAction().type),
    mergeMap(() => of(
      actions.resetNewsAction(),
    )),
  )
);

export const resetNewsActionEpic = (action$) => (
  action$.pipe(
    ofType(actions.resetNewsAction().type),
    mergeMap(() => of(
      actions.fetchNewsAction(),
    )),
  )
);
  
