import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { IOrder } from '../utils/interfaces';
import { IRootState } from '../rootStateInterface';

import Order from './Order';

import { getAllOrders } from '../actions/order';


const Start: FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const dispatch = useDispatch();
  // orders array in Redux
  const orderObject = useSelector((state: IRootState) => state.order);

  useEffect(() => {
    // check if we have orders in redux
    if (orderObject.orders && orderObject.orders.length > 0) {
      setOrders(orderObject.orders);
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch]);

  // when response comes back, assign data to "orders" array in state
  useEffect(() => {
    setOrders(orderObject.orders);
  }, [orderObject]);

  return (
    <div className="container">
      <div className="row">
        {orderObject.loading ? (
          <p>Loading Orders....</p>
        ) : (
          <>
            {/* render orders */}
            {orders.map((order, index) => <Order key={index} order={order} />)}
          </>
        )}
      </div>
    </div>
  )
}

export default Start;