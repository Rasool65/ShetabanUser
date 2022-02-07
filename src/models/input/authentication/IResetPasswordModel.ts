import * as yup from 'yup';

export interface IResetPassMobile {
  mobile: string;
}
export interface IResetPassConfirmCode {
  confirmCode: string;
}

export const mobileModelSchema: yup.SchemaOf<IResetPassMobile> = yup.object({
  mobile: yup.string().required('این فیلد نباید خالی باشد').length(11, 'تعداد ارقام مجاز ۱۱'),
});
export const confirmCodeModelSchema: yup.SchemaOf<IResetPassConfirmCode> = yup.object({
  confirmCode: yup.string().required('این فیلد نباید خالی باشد'),
});
