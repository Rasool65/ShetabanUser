import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from '@src/components/customButton';
import InputPasswordToggle from '@src/components/input-password-toggle';
import { APIURL_RESET_PASSWORD } from '@src/configs/apiConfig/apiUrls';

import useHttpRequest from '@src/hooks/useHttpRequest';
import { ILoginForgetPasswordModel, LoginForgetPasswordModelSchema } from '@src/models/input/authentication/ILoginModel';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, FormFeedback } from 'reactstrap';
import { ILoginProp } from './ILoginProp';

const LoginGetResetPassword: FunctionComponent<ILoginProp> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const httpRequest = useHttpRequest();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForgetPasswordModel>({ mode: 'onChange', resolver: yupResolver(LoginForgetPasswordModelSchema) });

  const onSubmit = (data: ILoginForgetPasswordModel) => {
    if (data) {
      data.newPassword === data.reNewPassword
        ? (setLoading(true),
          httpRequest
            .postRequest<IOutputResult<ILoginResultModel>>(APIURL_RESET_PASSWORD, {
              mobile: props.mobile,
              confirmCode: props.code,
              newPassword: data.newPassword,
              reNewPassword: data.reNewPassword,
            })
            .then((result) => {
              toast.success('تغییر کلمه عبور با موفقیت انجام شد', { position: 'top-center' });
              props.changePage(0);
            })
            .finally(() => {
              setLoading(false);
            }))
        : toast.error('کلمه عبور و تکرار آن برابر نیستند', { position: 'top-center' });
    }
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
              name="newPassword"
              render={({ field }) => (
                <>
                  <InputPasswordToggle
                    focuse={true}
                    visible={false}
                    inputClassName=""
                    className=""
                    invalid={errors.newPassword && true}
                    {...field}
                  />
                  <FormFeedback>{errors.newPassword?.message}</FormFeedback>
                </>
              )}
            />
          </div>
          <label className="pb-1">تکرار کلمه عبور</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-lock"></span>
            </div>
            <Controller
              control={control}
              name="reNewPassword"
              render={({ field }) => (
                <>
                  <InputPasswordToggle
                    focuse={false}
                    visible={false}
                    inputClassName=""
                    className=""
                    invalid={errors.reNewPassword && true}
                    {...field}
                  />
                  <FormFeedback>{errors.reNewPassword?.message}</FormFeedback>
                </>
              )}
            />
          </div>
        </div>
        <CustomButton loading={loading} className="btn btn-block btn-brand-03 border-radius mt-4 mb-3">
          <> تغییر کلمه عبور</>
        </CustomButton>
      </Form>
    </>
  );
};

export default LoginGetResetPassword;
