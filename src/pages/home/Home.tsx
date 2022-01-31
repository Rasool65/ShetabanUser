import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TOKEN_NAME, _UUID } from '../../config/apiConfig/apiConstantNames';
import IPageProps from '../../config/routerConfig/IPageProps';
import { URL_CONTACT_US, URL_LOGIN } from '../../config/urls';
import { ChangeLayoutLanguage } from '../../redux/actions/layout/LayoutActions';
import { RootStateType } from '../../redux/Store';

const Home: FunctionComponent<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const layoutState = useSelector((state: RootStateType) => state.layout);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const handleLanguage = (language: string) => {
    dispatch(ChangeLayoutLanguage(language));
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(_UUID);
    navigate(URL_LOGIN);
  };

  return (
    <>
      <div>
        <div>صفحه تست</div>
        <p>{layoutState.language}</p>
        <Link to={URL_CONTACT_US}>ارتباط با ما</Link> <br />
        <button type="button" onClick={() => handleLanguage('test')}>
          Change To English
        </button>
        <br />
        <button type="button" onClick={() => handleLogout()}>
          خروج از حساب کاربری
        </button>
      </div>
    </>
  );
};

export default Home;
