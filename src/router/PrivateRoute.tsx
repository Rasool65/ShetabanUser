import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { URL_LOGIN } from '../configs/urls';

const PrivateRoute = () => {
  const auth = useSelector((state: RootStateType) => state.authentication);
  return auth.isAuthenticate ? <Outlet /> : <Navigate to={URL_LOGIN} />;
};

export default PrivateRoute;
