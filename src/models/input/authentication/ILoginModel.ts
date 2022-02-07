import * as yup from 'yup';

export interface ILoginModel {
  mobile: string;
  password: string;
  captchaText: string;
}

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  mobile: yup.string().required('این فیلد نباید خالی باشد').length(11, 'تعداد ارقام مجاز ۱۱'),
  password: yup.string().required('این فیلد نباید خالی باشد'),
  captchaText: yup.string().required('این فیلد نباید خالی باشد'),
});
