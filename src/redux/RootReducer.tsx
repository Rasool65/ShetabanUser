import authenticationReducer from './reducers/authenticationReducer';
import layoutReducer from './reducers/LayoutReducer';
import navbarReducer from './reducers/navbarReducer';
import mapReducer from './reducers/mapReducer';
import generalInformationReducer from './reducers/generalInformationReducer';
export const RootReducer = {
  layout: layoutReducer,
  navbar: navbarReducer,
  authentication: authenticationReducer,
  map: mapReducer,
  generalInformation: generalInformationReducer,
};

export default RootReducer;
