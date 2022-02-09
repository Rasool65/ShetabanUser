import * as yup from 'yup';

export interface ILoginModel {
  mobile: string;
  password: string;
}

const mobileRegExp = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  mobile: yup.string().required('لطفا شماره موبایل را وارد نمایید').matches(mobileRegExp, 'شماره موبایل صحیح وارد نشده است'),
  password: yup.string().required(),
});
