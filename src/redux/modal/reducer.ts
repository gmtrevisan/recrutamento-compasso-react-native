import * as actions from './actions';
import { ModalState } from './types';

export const initialState: ModalState = {
  open: false,
  news: {
    _id: '',
    abstract: '',
    web_url: '',
    headline: { 
        main: '',
    } 
  },
};

const modalReducer = (state = initialState, action: any):ModalState => {
  switch (action.type) {
    case actions.setModalOpenAction().type:
      return {
        ...state,
        open: action.open,
      };
    case actions.setModalNewsAction().type:
      return {
        ...state,
        news: action.news,
      };
    default:
      return state;
  }
};

export default modalReducer;