import { News } from "../news/types";

export const setModalOpenAction = (open: boolean) => ({ type: 'SET_MODAL_OPEN', open });
export const setModalNewsAction = (news: News) => ({ type: 'SET_MODAL_NEWS', news });