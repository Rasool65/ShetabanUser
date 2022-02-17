import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from '@src/components/customButton';
import InputPasswordToggle from '@src/components/input-password-toggle';
import { APIURL_LOGIN, APIURL_LOGIN_CONFIRM_CODE, APIURL_LOGIN_FORGET_CODE } from '@src/configs/apiConfig/apiUrls';
import { URL_DASHBOARD } from '@src/configs/urls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { ILoginPasswordModel, LoginPasswordModelSchema } from '@src/models/input/authentication/ILoginModel';
import { ILoginConfirmCodeResult } from '@src/models/output/authentication/ILoginConfirmCodeResult';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, FormFeedback } from 'reactstrap';
import { ILoginProp } from './ILoginProp';

const LoginGetPassword: FunctionComponent<ILoginProp> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmCodeLoading, setConfirmCodeLoading] = useState<boolean>(false);

  const httpRequest = useHttpRequest();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPasswordModel>({ mode: 'onChange', resolver: yupResolver(LoginPasswordModelSchema) });

  const onSubmit = (data: ILoginPasswordModel) => {
    if (data) {
      setLoading(true);
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { mobile: props.mobile, password: data.password })
        .then((result) => {
          dispatch(handleLogin(result));
          navigate(URL_DASHBOARD);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const sendConfirmCode = () => {
    setConfirmCodeLoading(true);
    // send code from api
    httpRequest
      .postRequest<IOutputResult<ILoginConfirmCodeResult>>(APIURL_LOGIN_CONFIRM_CODE, { mobile: props.mobile })
      .then((result) => {
        props.changePage(2, props.mobile, result.data.data.remainingTimeSeconds);
      })
      .finally(() => {
        setConfirmCodeLoading(false);
      });
  };

  const sendForgetPasswordCode = () => {
    setConfirmCodeLoading(true);
    httpRequest
      .postRequest<IOutputResult<ILoginConfirmCodeResult>>(APIURL_LOGIN_FORGET_CODE, { mobile: props.mobile })
      .then((result) => {
        props.changePage(3, props.mobile, result.data.data.remainingTimeSeconds);
      })
      .finally(() => {
        setConfirmCodeLoading(false);
      });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
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
                  <InputPasswordToggle
                    visible={false}
                    inputClassName=""
                    className=""
                    invalid={errors.password && true}
                    {...field}
                  />
                  <FormFeedback>{errors.password?.message}</FormFeedback>
                </>
              )}
            />
          </div>
        </div>
        <CustomButton loading={loading} className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
          <>وارد شوید</>
        </CustomButton>
      </Form>
      <p className="mb-1">
        {confirmCodeLoading ? (
          <img className="loading-link" src={require('@src/assets/images/shetaban/loading.gif')} />
        ) : (
          <a
            href="#"
            className=""
            onClick={() => {
              sendConfirmCode();
            }}
          >
            <span className="fa fa-arrow-left"></span> ورود با رمز یکبار مصرف
          </a>
        )}
      </p>
      <p className="mb-0">
        <a
          href="#"
          className=""
          onClick={() => {
            sendForgetPasswordCode();
          }}
        >
          <span className="fa fa-arrow-left"></span> فراموشی کلمه عبور
        </a>
      </p>
    </>
  );
};

export default LoginGetPassword;
