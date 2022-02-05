import * as yup from 'yup';

export interface IResetPasswordModel {
  mobile: string;
}

export const LoginModelSchema: yup.SchemaOf<IResetPasswordModel> = yup.object({
  mobile: yup.string().required(),
});
