import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_MAIN } from '../../configs/urls';
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
  Spinner,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  const [loading, setLoading] = useState(false);

  const { postRequest, getRequest } = useHttpRequest();

  const onSubmit = (data: any) => {
    if (data) {
      const body = {
        ...data,
        captchaToken: captcha.token,
      };
      setLoading(true);
      postRequest(APIURL_LOGIN, body)
        .then((result) => {
          setLoading(false);
          dispatch(handleLogin(result));
          navigate(URL_MAIN);
          showSuccess('ورود موفق');
        })
        .catch((err) => {
          setLoading(false);
          showError(err.data.Message);
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
      setCaptcha(result.data);
    });
  };
  return (
    <div className="login-signup-wrap p-5 gray-light-bg rounded shadow">
      <div className="login-signup-header text-center">
        {/* <a href="index.html">
                <img src="assets/img/logo-color.png" className="img-fluid mb-3" alt="لوگو" />
              </a> */}
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
                  <Input invalid={errors.mobile && true} placeholder="09123456789" className="form-control" {...field} />
                  <FormFeedback>{errors.mobile?.message}</FormFeedback>
                </>
              )}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="pb-1">کلمه عبور</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-lock"></span>
            </div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <Input
                    invalid={errors.password && true}
                    placeholder="رمز عبور را وارد کنید"
                    className="form-control"
                    {...field}
                  />
                  <FormFeedback>{errors.password?.message}</FormFeedback>
                </>
              )}
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
          <Controller
            control={control}
            name="captchaText"
            render={({ field }) => (
              <>
                <Input invalid={errors.captchaText && true} placeholder="کد را وارد کنید" className="form-control" {...field} />
                <FormFeedback>{errors.captchaText?.message}</FormFeedback>
              </>
            )}
          />
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
        رمز خودرا فراموش کرده اید؟{' '}
        <button
          className="btn-link"
          onClick={() => {
            changePage(AuthPages[1]);
          }}
        >
          ورود با رمز یکبارمصرف
        </button>
      </p>
    </div>
  );
};

export default Login;
