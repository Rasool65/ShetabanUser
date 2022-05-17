import navigation from '@src/navigation/vertical';
import { Fragment, FunctionComponent, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
import LayoutWrapper from '@src/layouts/components/layout-wrapper';
import { useLayout } from '@src/hooks/useLayout';
import { useRouterTransition } from '@src/hooks/useRouterTransition';
import { URL_DASHBOARD, URL_LOGIN, URL_MAIN } from '@src/configs/urls';
import LandingLayout from '@src/layouts/LandingLayout';
import NotFound from '@src/pages/errors/NotFound';
const LazyVerticalLayout = lazy(() => import('@src/layouts/VerticalLayout'));

const Routers: FunctionComponent = () => {
  const { layout, setLayout } = useLayout();
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
                    <LazyVerticalLayout
                      layout="VerticalLayout"
                      transition={transition}
                      setTransition={setTransition}
                      setLayout={setLayout}
                      menuData={navigation}
                    >
                      <LayoutWrapper layout="VerticalLayout" transition={transition} setTransition={setTransition}>
                        <route.component name={route.name} {...route.props} />
                      </LayoutWrapper>
                    </LazyVerticalLayout>
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
                  <LandingLayout>
                    <route.component name={route.name} {...route.props} />
                  </LandingLayout>
                )
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
