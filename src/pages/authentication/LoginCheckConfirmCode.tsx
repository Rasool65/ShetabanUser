import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from '@src/components/customButton';
import InputPasswordToggle from '@src/components/input-password-toggle';
import { APIURL_LOGIN, APIURL_LOGIN_CHECK_CONFIRM_CODE, APIURL_LOGIN_CONFIRM_CODE } from '@src/configs/apiConfig/apiUrls';
import { URL_MAIN } from '@src/configs/urls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import {
  ILoginConfirmCodeModel,
  ILoginPasswordModel,
  LoginConfirmCodeModelSchema,
  LoginPasswordModelSchema,
} from '@src/models/input/authentication/ILoginModel';
import { ILoginConfirmCodeResult } from '@src/models/output/authentication/ILoginConfirmCodeResult';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormFeedback, Input, InputGroup } from 'reactstrap';
import { ILoginProp } from './ILoginProp';

const LoginCheckConfirmCode: FunctionComponent<ILoginProp> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmCodeLoading, setConfirmCodeLoading] = useState<boolean>(false);
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(props.remainingTimeSeconds ?? 0);

  const httpRequest = useHttpRequest();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginConfirmCodeModel>({ mode: 'onChange', resolver: yupResolver(LoginConfirmCodeModelSchema) });

  const onSubmit = (data: ILoginConfirmCodeModel) => {
    if (data) {
      setLoading(true);
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN_CHECK_CONFIRM_CODE, {
          mobile: props.mobile,
          code: data.code,
        })
        .then((result) => {
          dispatch(handleLogin(result));
          navigate(URL_DASHBOARD);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const senConfirmCode = () => {
    setConfirmCodeLoading(true);
    // send code from api
    httpRequest
      .postRequest<IOutputResult<ILoginConfirmCodeResult>>(APIURL_LOGIN_CONFIRM_CODE, { mobile: props.mobile })
      .then((result) => {
        setRemainingTimeSeconds(result.data.data.remainingTimeSeconds);
      })
      .finally(() => {
        setConfirmCodeLoading(false);
      });
  };

  useEffect(() => {
    if (remainingTimeSeconds > 0) {
      const timer = setTimeout(() => {
        setRemainingTimeSeconds(remainingTimeSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
        <div className="form-group">
          <label className="pb-1">کد ارسالی</label>
          <InputGroup className="input-group-merge input-group-btn">
            <div className="input-icon">
              <span className="ti-key"></span>
            </div>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <>
                  <Input
                    type="number"
                    invalid={errors.code && true}
                    placeholder=""
                    autoComplete="off"
                    autoFocus={true}
                    {...field}
                  />
                </>
              )}
            />
            <CustomButton
              loading={confirmCodeLoading}
              type="button"
              onClick={() => senConfirmCode()}
              className="btn btn-secondary"
              disabled={remainingTimeSeconds > 0}
            >
              {remainingTimeSeconds > 0 ? remainingTimeSeconds + ' ثانیه دیگر' : <>ارسال مجدد کد</>}
            </CustomButton>
          </InputGroup>
        </div>
        <CustomButton loading={loading} className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
          <>وارد شوید</>
        </CustomButton>
      </Form>
      <p className="mb-1"></p>
    </>
  );
};

export default LoginCheckConfirmCode;
