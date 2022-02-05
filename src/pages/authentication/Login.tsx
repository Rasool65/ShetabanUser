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
import { APIURL_GET_CAPTCHA, APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import logo from '@src/assets/images/logo/bonnychow_80.png';
import themeConfig from '@src/configs/theme/themeConfig';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IAuthProps, ICaptcha } from './IAuthPages';
import { AuthPages } from './Authentication';
import { toast } from 'react-toastify';

const Login: FunctionComponent<IAuthProps> = (props) => {
  const { changePage } = props;
  const [captcha, setCaptcha] = useState<ICaptcha>({
    width: 0,
    height: 0,
    token: '',
    captchaContent: '',
  });

  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  const { postRequest, getRequest } = useHttpRequest();

  const onSubmit = (data: any) => {
    if (data) {
      const body = {
        ...data,
        captchaToken: captcha.token,
      };
      postRequest(APIURL_LOGIN, body)
        .then((result) => {
          toast('ورود با موفقیت', { type: 'success' });
        })
        .catch((err) => {
          toast('');
          setCaptchaData();
        });
    }
  };

  useEffect(() => {
    setCaptchaData();
  }, []);

  const setCaptchaData = () => {
    setCaptcha({
      ...captcha,
      captchaContent: '',
    });
    getRequest(APIURL_GET_CAPTCHA).then((result: any) => {
      console.log(result);
      setCaptcha(result.data);
    });
  };

  return (
    <div className="login-signup-wrap p-5 gray-light-bg rounded shadow">
      <div className="login-signup-header text-center">
        {/* <a href="index.html">
                <img src="assets/img/logo-color.png" className="img-fluid mb-3" alt="لوگو" />
              </a> */}
        <h4 className="mb-5">ورود به حساب کاربری خود</h4>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
        <div className="form-group">
          <label className="pb-1">شماره تلفن همراه</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-mobile"></span>
            </div>
            <input {...register('mobile')} className="form-control" placeholder="09123456789" />
          </div>
        </div>

        <div className="form-group">
          <label className="pb-1">کلمه عبور</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-lock"></span>
            </div>
            <input
              {...register('password')}
              type="password"
              name="password"
              className="form-control"
              placeholder="رمز ورود خود را وارد کنید"
            />
          </div>
        </div>

        <div style={{ height: 80 }} className="d-flex flex-row align-items-center justify-content-center form-group">
          {!!captcha.captchaContent ? (
            <img src={captcha.captchaContent} />
          ) : (
            <div style={{ height: '40px', width: '40px' }} className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <input {...register('captchaText')} className="form-control" placeholder="عدد را وارد کنید" />
        </div>

        <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
          کد را وارد کنید
        </button>
      </Form>
      {/* <div className="other-login-signup my-3">
              <div className="or-login-signup text-center">
                <strong>یا ورود با</strong>
              </div>
            </div>
            <ul className="list-inline social-login-signup text-center">
              <li className="list-inline-item my-1">
                <a href="#" className="btn btn-facebook">
                  <i className="fab fa-facebook-f pr-1"></i> فیس بوک
                </a>
              </li>
              <li className="list-inline-item my-1">
                <a href="#" className="btn btn-google">
                  <i className="fab fa-google pr-1"></i> گوگل
                </a>
              </li>
              <li className="list-inline-item my-1">
                <a href="#" className="btn btn-twitter">
                  <i className="fab fa-twitter pr-1"></i> توییتر
                </a>
              </li>
            </ul> */}
      <p className="text-center mb-0">
        رمز خودرا فراموش کرده اید؟{' '}
        <button
          className="btn-link"
          onClick={() => {
            changePage(AuthPages[1]);
          }}
        >
          بازیابی رمز عبور
        </button>
      </p>
    </div>
  );
};

export default Login;
