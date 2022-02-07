import { yupResolver } from '@hookform/resolvers/yup';
import { APIURL_CONFIRM_CODE, APIURL_SEND_CONFIRM_CODE } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { LoginModelSchema } from '@src/models/input/authentication/ILoginModel';
import {
  confirmCodeModelSchema,
  IResetPassConfirmCode,
  IResetPassMobile,
  mobileModelSchema,
} from '@src/models/input/authentication/IResetPasswordModel';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Col, Form, FormFeedback, Input, Row, Spinner } from 'reactstrap';
import { AuthPages } from './Authentication';
import { IAuthProps } from './IAuthPages';

const ResetPassword = (props: IAuthProps) => {
  const { changePage } = props;

  const { postRequest } = useHttpRequest();
  const [mobile, setMobile] = useState<string>('');

  const [mobileLoading, setMobileLoading] = useState<boolean>(false);
  const [confirmCodeLoading, setConfirmCodeLoading] = useState<boolean>(false);

  // const [loading, setLoading] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);

  const onMobileSubmit = (data: any) => {
    // setLoading(true);
    if (data) {
      setMobileLoading(true);

      postRequest(APIURL_SEND_CONFIRM_CODE, data)
        .then((result) => {
          setMobileLoading(false);
          setFormStep(1);
          setMobile(data.mobile);
          // setLoading(false);
          toast('کد با موفقیت ارسال شد', {
            type: 'success',
          });
        })
        .catch((err) => {
          //hanlde error
          setMobileLoading(false);
        });
    }
  };
  const onConfirmCodeSubmit = (data: IResetPassConfirmCode) => {
    if (data) {
      setConfirmCodeLoading(true);
      const body = {
        ...data,
        mobile,
      };
      postRequest(APIURL_CONFIRM_CODE, body)
        .then((result) => {
          setConfirmCodeLoading(false);
          console.log(result);
        })
        .catch((err) => {
          setConfirmCodeLoading(false);
        });
    }
  };

  const {
    control: mobileControl,
    handleSubmit: mobileHandleSubmit,
    formState: { errors: mobileErrors },
  } = useForm<IResetPassMobile>({ mode: 'onChange', resolver: yupResolver(mobileModelSchema) });

  const {
    control: confirmCodeControl,
    handleSubmit: confirmCodeHandleSubmit,
    formState: { errors: confirmCodeErrors },
  } = useForm<IResetPassConfirmCode>({ mode: 'onChange', resolver: yupResolver(confirmCodeModelSchema) });

  return (
    <div className="login-signup-wrap p-5 gray-light-bg rounded shadow">
      <div className="login-signup-header text-center">
        <h4 className="mb-5">ورود با رمز یک بارمصرف</h4>
      </div>

      {formStep === 0 && (
        <Form onSubmit={mobileHandleSubmit(onMobileSubmit)} className="login-signup-form">
          <div className="form-group">
            <label className="pb-1">شماره موبایل</label>
            <div className="input-group input-group-merge">
              <div className="input-icon">
                <span className="ti-mobile"></span>
              </div>
              <Controller
                control={mobileControl}
                name="mobile"
                render={({ field }) => (
                  <>
                    <Input invalid={mobileErrors.mobile && true} placeholder="09123456789" className="form-control" {...field} />
                    <FormFeedback>{mobileErrors.mobile?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
            {mobileLoading ? (
              <div style={{ width: 26, height: 26 }} className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'ارسال کد'
            )}
          </button>
        </Form>
      )}
      {formStep === 1 && (
        <Form onSubmit={confirmCodeHandleSubmit(onConfirmCodeSubmit)} className="login-signup-form">
          <div className="form-group">
            <label className="pb-1">کد ارسالی </label>
            <div className="input-group input-group-merge">
              <div className="input-icon">
                <span className="ti-mobile"></span>
              </div>
              <Controller
                control={confirmCodeControl}
                name="confirmCode"
                render={({ field }) => (
                  <>
                    <Input
                      invalid={confirmCodeErrors.confirmCode && true}
                      placeholder="کد ارسالی را وارد کنید"
                      className="form-control"
                      {...field}
                    />
                    <FormFeedback>{confirmCodeErrors.confirmCode?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
            {confirmCodeLoading ? (
              <div style={{ width: 26, height: 26 }} className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'تایید'
            )}
          </button>
        </Form>
      )}

      <div className="text-center mb-0">
        <button
          className="btn-link "
          onClick={() => {
            changePage(AuthPages[0]);
          }}
        >
          وارد شوید
        </button>
      </div>
    </div>
  );
};
export default ResetPassword;
