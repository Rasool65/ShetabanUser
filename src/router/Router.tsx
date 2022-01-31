import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../config/routerConfig/RouterList';
import RouteType from '../config/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';

const Routers: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.type == RouteType.private ? (
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              <Route path={route.path} element={<route.component name={route.name} {...route.props} />} />
            </Route>
          ) : (
            <Route key={index} path={route.path} element={<route.component name={route.name} {...route.props} />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
