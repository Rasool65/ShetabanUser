import * as yup from 'yup';

export interface IRequestModel {
  soldToParty: string;
  poNumber?: string;
  poDate?: string;
  validFrom: string;
  validTo: string;
  route: string;
  material: string;
  meansOfTransPortType?: string;
  recevingPoint?: string;
  shippingType: string;
  netWeight: string;
  loadingDateTime: string;
}
export const RequestModelSchema: yup.SchemaOf<IRequestModel> = yup.object({
  soldToParty: yup.string().required('نام مشتری را وارد نمایید'),
  poNumber: yup.string(),
  poDate: yup.string(),
  validFrom: yup.string().required('تاریخ شروع اعتبار را وارد نمایید'),
  validTo: yup.string().required('تاریخ پایان اعتبار را وارد نمایید'),
  route: yup.string().required('نوع مسیر را وارد نمایید'),
  material: yup.string().required('نوع سرویس را وارد نمایید'),
  meansOfTransPortType: yup.string(),
  recevingPoint: yup.string(),
  shippingType: yup.string().required('نوع وسیله حمل و نقل را وارد نمایید'),
  netWeight: yup.string().required('وزن خالص را وارد نمایید'),
  loadingDateTime: yup.string().required('تاریخ و زمان بارگیری را وارد نمایید'),
});
