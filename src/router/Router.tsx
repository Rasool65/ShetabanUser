import navigation from '@src/navigation/vertical';
import VerticalLayout from '@src/layouts/VerticalLayout';
import { Fragment, FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
import LayoutWrapper from '@src/layouts/components/layout-wrapper';
import { useLayout } from '@src/hooks/useLayout';
import { useRTL } from '@src/hooks/useRTL';
import { useRouterTransition } from '@src/hooks/useRouterTransition';
import { URL_LOGIN } from '@src/configs/urls';

const Routers: FunctionComponent = () => {
  const { layout, setLayout } = useLayout();
  const [isRtl, setIsRtl] = useRTL();
  const { transition, setTransition } = useRouterTransition();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.type == RouteType.private ? (
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              <Route
                path={route.path}
                element={
                  <>
                    <VerticalLayout
                      layout="VerticalLayout"
                      transition={transition}
                      setTransition={setTransition}
                      setLayout={setLayout}
                      menuData={navigation}
                    >
                      <LayoutWrapper layout="VerticalLayout" transition={transition} setTransition={setTransition}>
                        <route.component name={route.name} {...route.props} />
                      </LayoutWrapper>
                    </VerticalLayout>
                  </>
                }
              />
            </Route>
          ) : (
            <Route
              key={index}
              path={route.path}
              element={
                route.path == URL_LOGIN ? (
                  <Fragment>
                    <route.component name={route.name} {...route.props} />
                  </Fragment>
                ) : (
                  <VerticalLayout>
                    <route.component name={route.name} {...route.props} />
                  </VerticalLayout>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
