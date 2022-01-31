import { combineReducers } from 'redux';
import layoutReducer from './reducers/LayoutReducer';

export const RootReducer = combineReducers({
  layout: layoutReducer,
});

export default RootReducer;
