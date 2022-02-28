import * as yup from 'yup';

export interface IProfileChangePasswordModel {
  currentPassword: string;
  password?: string;
  rePassword?: string;
}

export const IProfileChangePasswordSchema: yup.SchemaOf<IProfileChangePasswordModel> = yup.object({
  currentPassword: yup.string().required('لطفا رمز عبور جاری را وارد نمایید'),
  password: yup.string().required('لطفا رمز عبور را وارد نمایید'),
  rePassword: yup
    .string()
    .required('لطفا تکرار رمز عبور را وارد نمایید')
    .oneOf([yup.ref(`password`), null], 'رمز عبور با تکرار آن برابر نیست'),
});
