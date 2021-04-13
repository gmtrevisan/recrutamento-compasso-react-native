import * as actions from './actions';
import { News, NewsState } from './types';

export const initialState: NewsState = {
  loading: false,
  error: false,
  news: [],
  page: 0,
  filter: '"Science"',
};

export const sanitizeData = (news: Array<News>) => {
  return news.map(({ _id, abstract, web_url, headline: { main } }) => ({ _id, abstract, web_url, headline: { main } }));
}

const newsReducer = (state = initialState, action: any):NewsState => {
  switch (action.type) {
    case actions.resetNewsAction().type:
      return {
        ...initialState,
        filter: state.filter,
      };
    case actions.fetchNewsAction().type:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.fetchNewsSuccessAction().type:
      return {
        ...state,
        loading: false,
        error: false,
        news: [...state.news, ...sanitizeData(action.response)],
      };
    case actions.fetchNewsErrorAction().type:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actions.setNewsPageAction().type:
      return {
        ...state,
        page: action.page,
      };
    case actions.setNewsFilterAction().type:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default newsReducer;