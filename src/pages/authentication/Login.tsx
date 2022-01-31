import { FunctionComponent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOKEN_NAME, _UUID } from '../../config/apiConfig/apiConstantNames';
import { URL_LOGIN, URL_MAIN } from '../../config/urls';
import * as uuid from 'uuid';
import IPageProps from '../../config/routerConfig/IPageProps';

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const handleLogin = () => {
    localStorage.setItem(TOKEN_NAME, 'test');
    localStorage.setItem(_UUID, uuid.v4());
    navigate(URL_MAIN);
  };

  return (
    <>
      <div>ورود</div>
      <button type="button" onClick={() => handleLogin()}>
        ورود آزمایشی
      </button>
    </>
  );
};

export default Login;
