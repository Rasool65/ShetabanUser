import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './RootReducer';

export const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStateType = ReturnType<typeof RootReducer>;

export default Store;
