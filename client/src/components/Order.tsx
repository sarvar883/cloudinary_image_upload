import React, { FC, Suspense } from 'react';
import { useDispatch, } from 'react-redux';
import { IOrder } from '../utils/interfaces';

import { removeImage } from '../actions/order';

interface OrderProps {
  order: IOrder;
};


const Order: FC<OrderProps> = ({ order }) => {
  const dispatch = useDispatch();

  const deleteOrder = (orderToDelete: IOrder) => {
    dispatch(removeImage(orderToDelete));
  };

  return (
    <div className="col-lg-4 col-md-6 mt-3">
      <div className="card">
        <div className="card-body">
          <Suspense fallback={(<p>Loading...</p>)}>
            <img
              id="myImg"
              src={order.picture.url}
              className="img-fluid"
              alt=""
            />
          </Suspense>
        </div>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteOrder(order)}
        > Delete Image</button>
      </div>
    </div>
  )
}

export default Order;