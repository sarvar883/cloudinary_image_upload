import { IDispatch } from '../utils/interfaces';
import {
  SET_LOADING_ORDERS,
  GET_ALL_ORDERS,
  DELETE_ORDER_WITH_ID,
  CLEAR_ORDERS,
} from '../actions/types';
import { IOrder } from '../utils/interfaces';


export interface IOrderReducer {
  orders: IOrder[];
  loading: boolean;
  errors: Object;
}


const initialState: IOrderReducer = {
  orders: [],
  loading: false,
  errors: {},
};


export default function (state = initialState, action: IDispatch) {
  switch (action.type) {
    case SET_LOADING_ORDERS:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case DELETE_ORDER_WITH_ID:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload),
      };

    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };

    default: return state;
  }
};