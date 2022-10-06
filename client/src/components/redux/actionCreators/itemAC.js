/* eslint-disable import/prefer-default-export */
import {
  GET_ITEMS,
  ERROR_ITEM,
} from '../actionTypes/itemAT';

export function getItemsAC(payload) {
  return {
    type: GET_ITEMS,
    payload,
  };
}

export function errorItemAC(payload) {
  return {
    type: ERROR_ITEM,
    payload,
  };
}
