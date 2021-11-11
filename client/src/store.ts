import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IRootState } from './rootStateInterface';

// import reducers
import orderReducer from './reducers/orderReducer';

// combine reducers
const reducer = combineReducers<IRootState>({
  order: orderReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;