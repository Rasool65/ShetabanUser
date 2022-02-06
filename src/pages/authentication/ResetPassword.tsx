import { APIURL_SEND_CONFIRM_CODE } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { AuthPages } from './Authentication';
import { IAuthProps } from './IAuthPages';

const ResetPassword = (props: IAuthProps) => {
  const { changePage } = props;

  const { handleSubmit, register } = useForm();
  const { postRequest } = useHttpRequest();

  const [showForm, setShowForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (data) {
      postRequest(APIURL_SEND_CONFIRM_CODE, data).then((result) => {
        setShowForm(false);
        setLoading(false);
        toast('کد با موفقیت ارسال شد', {
          type: 'success',
        });
      });
    }
  };

  return (
    <div className="login-signup-wrap p-5 gray-light-bg rounded shadow">
      <div className="login-signup-header text-center">
        <h4 className="mb-5">ورود با رمز یک بارمصرف</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
        {showForm ? (
          <>
            <div className="form-group">
              <label className="pb-1">شماره موبایل</label>
              <div className="input-group input-group-merge">
                <div className="input-icon">
                  <span className="ti-mobile"></span>
                </div>
                <input
                  type="text"
                  // onKeyPress={(event) => {
                  //   if (!/[0-9]|[/r]/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  {...register('mobile')}
                  className="form-control"
                  placeholder="09123456789"
                />
              </div>
            </div>
            <Button disabled={loading} type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
              ارسال کد &nbsp;
              {loading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden"></span>
                </Spinner>
              ) : (
                ''
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="pb-1">کد ارسالی </label>
              <div className="input-group input-group-merge">
                <div className="input-icon">
                  <span className="ti-mobile"></span>
                </div>
                <input
                  // {...register('mobile')}
                  className="form-control"
                  placeholder="کد را وارد کنید"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
              تایید
            </button>
          </>
        )}
      </form>
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
