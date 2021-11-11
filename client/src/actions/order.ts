import axios from 'axios';

import { Dispatch } from 'react';
import {
  IDispatch,
  IOrder,
} from '../utils/interfaces';
import { History, LocationState } from 'history';

import {
  GET_ALL_ORDERS,
  SET_LOADING_ORDERS,
  DELETE_ORDER_WITH_ID,
  CLEAR_ORDERS,
} from './types';


export const imageUpload = (formdata: FormData, history: History<LocationState>) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await axios.post('/order/new', formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });

    // in redux, set orders to empty array, because we just added new order and want to see it in orders page
    dispatch({ type: CLEAR_ORDERS });

    history.push('/');
  } catch (error) {
    console.log('imageUpload ERROR: ', error);
  }
};


export const removeImage = (order: IOrder) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await axios.post('/order/delete', { order });

    // remove order with specific id from redux
    dispatch({ type: DELETE_ORDER_WITH_ID, payload: order._id });
  } catch (error) {
    console.log('removeImage ERROR: ', error);
  }
};


export const getAllOrders = () => async (dispatch: Dispatch<IDispatch>) => {
  dispatch({ type: SET_LOADING_ORDERS });
  try {
    const res = await axios.post('/order/get-all');

    dispatch({ type: GET_ALL_ORDERS, payload: res.data.data });
  } catch (error) {
    console.log('getAllImages ERROR: ', error);
  }
};