import { APIURL_SEND_CONFIRM_CODE } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import { AuthPages } from './Authentication';
import { IAuthProps } from './IAuthPages';

const ResetPassword = (props: IAuthProps) => {
  const { changePage } = props;

  const { handleSubmit, register } = useForm();
  const { postRequest } = useHttpRequest();

  const onSubmit = (data: any) => {
    if (data) {
      postRequest(APIURL_SEND_CONFIRM_CODE, data).then((result) => {
        toast('کد با موفقیت ارسال شد', {
          type: 'success',
        });
      });
    }
  };

  return (
    <div className="login-signup-wrap p-5 gray-light-bg rounded shadow">
      <div className="login-signup-header text-center">
        <h4 className="mb-5">بازنشانی حساب خود</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-signup-form">
        <div className="form-group">
          <label className="pb-1">شماره تلفن</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-mobile"></span>
            </div>
            <input {...register('mobile')} className="form-control" placeholder="09123456789" />
          </div>
        </div>

        <button type="submit" className="btn btn-block btn-brand-02 border-radius mt-4 mb-3">
          ارسال کد
        </button>
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
