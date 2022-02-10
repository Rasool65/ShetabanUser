import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN, URL_MAIN } from '../../configs/urls';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import { Form, FormFeedback, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ILoginProp, LoginPages } from './ILoginProp';
import { ILoginMobileModel, LoginMobileModelSchema } from '@src/models/input/authentication/ILoginModel';

const LoginGetMobile: FunctionComponent<ILoginProp> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginMobileModel>({ mode: 'onChange', resolver: yupResolver(LoginMobileModelSchema) });

  const onSubmit = (data: ILoginMobileModel) => {
    if (data) {
      props.changePage(1, data.mobile);
    }
  };

  return (
    <>
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
                    autoComplete="off"
                    autoFocus={true}
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
    </>
  );
};

export default LoginGetMobile;
