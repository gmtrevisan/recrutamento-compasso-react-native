import { News } from './types';

export const resetNewsAction = () => ({ type: 'RESET_NEWS' });
export const fetchNewsAction = () => ({ type: 'FETCH_NEWS' });
export const fetchNewsSuccessAction = (response:Array<News>) => ({ type: 'FETCH_NEWS_SUCCESS', response });
export const fetchNewsErrorAction = () => ({ type: 'FETCH_NEWS_ERROR' });
export const setNewsPageAction = (page:number) => ({ type: 'SET_NEWS_PAGE', page });
export const setNewsFilterAction = (filter:string) => ({ type: 'SET_NEWS_FILTER', filter });
