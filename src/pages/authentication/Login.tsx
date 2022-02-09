import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN, URL_MAIN } from '../../configs/urls';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Facebook, GitHub, HelpCircle, Mail, Twitter } from 'react-feather';
import { useSkin } from '@src/hooks/useSkin';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import { LoginModelSchema, ILoginModel } from '@src/models/input/authentication/ILoginModel';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import logo from '@src/assets/images/logo/bonnychow_80.png';
import themeConfig from '@src/configs/theme/themeConfig';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { skin } = useSkin();

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg';
  const source = require(`@src/assets/images/pages/${illustration}`);
  const httpRequest = useHttpRequest();
  const toast = useToast();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  const onSubmit = (data: ILoginModel) => {
    if (data) {
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { username: data.mobile, password: data.password })
        .then((result) => {
          dispatch(handleLogin(result));
          navigate(URL_MAIN);
        });
    }
  };

  return (
    <section className="page-header-section ptb-100 bg-image full-height" image-overlay="8">
      <div
        className="background-image-wraper"
        style={{ backgroundImage: 'url(' + require('@src/assets/images/shetaban/login-bg.jpg') + ')', opacity: '1' }}
      ></div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="login-signup-wrap p-5 rounded shadow">
              <div className="login-signup-header text-center">
                <a href="#">
                  <img src={require('@src/assets/images/shetaban/logo.png')} className="img-fluid mb-3" alt="شتابان" />
                </a>
                <h4 className="mb-5">ورود به حساب کاربری </h4>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
                <div className="form-group">
                  <label className="pb-1">شماره موبایل</label>
                  <div className="input-group input-group-merge">
                    <div className="input-icon">
                      <span className="ti-mobile"></span>
                    </div>
                    <Controller
                      control={control}
                      name="mobile"
                      render={({ field }) => (
                        <>
                          <Input
                            type="number"
                            invalid={errors.mobile && true}
                            placeholder="09123456789"
                            className="form-control"
                            autoComplete="off"
                            {...field}
                          />
                          <FormFeedback>{errors.mobile?.message}</FormFeedback>
                        </>
                      )}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
                  {loading ? (
                    <div style={{ width: 26, height: 26 }} className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    'وارد شوید'
                  )}
                </button>
              </Form>
              <p className="text-center mb-0">
                اگر ثبت نام نکرده اید{' '}
                <a
                  href="#"
                  className=""
                  onClick={() => {
                    // changePage(AuthPages[1]);
                  }}
                >
                  راهنمای ثبت نام
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="copyright-wrap small-text text-center mt-5 text-white">
              <p className="mb-0">© شرکت شتابان شمال، کلیه حقوق محفوظ است</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
