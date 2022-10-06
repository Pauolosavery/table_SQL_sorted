/* eslint-disable no-fallthrough */
/* eslint-disable default-param-last */
import {
  GET_ITEMS,
  ERROR_ITEM,
} from '../actionTypes/itemAT';

const itemReducer = (state = { items: [], pageCount: 1 }, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload.items, pageCount: action.payload.pageCount };
    case ERROR_ITEM:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default itemReducer;
