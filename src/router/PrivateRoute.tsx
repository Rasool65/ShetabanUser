import { Navigate, Outlet } from 'react-router-dom';
import { TOKEN_NAME, _UUID } from '../config/apiConfig/apiConstantNames';
import { URL_LOGIN } from '../config/urls';
import { validate as uuidValidate } from 'uuid';

const PrivateRoute = () => {
  const uuid = localStorage.getItem(_UUID);
  const token = localStorage.getItem(TOKEN_NAME);
  const auth = uuid && token && uuidValidate(uuid) && token != '';
  return auth ? <Outlet /> : <Navigate to={URL_LOGIN} />;
};

export default PrivateRoute;
