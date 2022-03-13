import * as yup from 'yup';

export interface IProfileChangePasswordModel {
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export const IProfileChangePasswordSchema: yup.SchemaOf<IProfileChangePasswordModel> = yup.object({
  currentPassword: yup.string().required('لطفا رمز عبور جاری را وارد نمایید'),
  newPassword: yup.string().required('لطفا رمز عبور را وارد نمایید').min(6, 'حداقل تعداد رمز عبور 6 کاراکتر می باشد'),
  reNewPassword: yup
    .string()
    .required('لطفا تکرار رمز عبور را وارد نمایید')
    .oneOf([yup.ref(`newPassword`), null], 'رمز عبور با تکرار آن برابر نیست'),
});
