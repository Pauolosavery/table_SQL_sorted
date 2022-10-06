/* eslint-disable no-unused-vars */
import {
  errorItemAC,
  getItemsAC,
} from '../actionCreators/itemAC';

export const fetchGetItems = (query) => (dispatch) => {
  fetch(`/items${query}`)
    .then((res) => res.json())
    .then((data) => dispatch(getItemsAC(data)))
    .catch((err) => dispatch(errorItemAC(err)));
};

export const fetchCreateItem = (body) => (dispatch) => {
  fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(() => dispatch(fetchGetItems()))
    .catch((err) => dispatch(errorItemAC(err)));
};

export const fetchUpdateItem = (body) => (dispatch) => {
  fetch('/items', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => dispatch(fetchGetItems()))
    .catch((err) => dispatch(errorItemAC(err)));
};

export const fetchItemDel = (body) => (dispatch) => {
  fetch('/items', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => dispatch(fetchGetItems()))
    .catch((err) => dispatch(errorItemAC(err)));
};
