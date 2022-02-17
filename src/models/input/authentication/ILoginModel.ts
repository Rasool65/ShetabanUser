import * as yup from 'yup';

export interface ILoginMobileModel {
  mobile: string;
}

const mobileRegExp = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;

export const LoginMobileModelSchema: yup.SchemaOf<ILoginMobileModel> = yup.object({
  mobile: yup.string().required('لطفا شماره موبایل را وارد نمایید').matches(mobileRegExp, 'شماره موبایل صحیح وارد نشده است'),
});

export interface ILoginPasswordModel {
  password: string;
}
export const LoginPasswordModelSchema: yup.SchemaOf<ILoginPasswordModel> = yup.object({
  password: yup.string().required('لطفا کلمه عبور را وارد نمایید'),
});

export interface ILoginConfirmCodeModel {
  code: string;
}
export const LoginConfirmCodeModelSchema: yup.SchemaOf<ILoginConfirmCodeModel> = yup.object({
  code: yup.string().required('لطفا کد را وارد نمایید'),
});

export interface ILoginForgetPasswordModel {
  newPassword: string;
  reNewPassword: string;
}
export const LoginForgetPasswordModelSchema: yup.SchemaOf<ILoginForgetPasswordModel> = yup.object({
  newPassword: yup.string().required('کلمه عبور خود را وارد نمایید'),
  reNewPassword: yup.string().required('تکرار کلمه عبور را وارد نمایید'),
});
