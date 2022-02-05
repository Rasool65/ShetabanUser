import * as yup from 'yup';

export interface ILoginModel {
  mobile: string;
  password: string;
  captchaText: string;
}

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  mobile: yup.string().required(),
  password: yup.string().required(),
  captchaText: yup.string().required(),
});
