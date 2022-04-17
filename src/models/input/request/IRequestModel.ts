import * as yup from 'yup';

export interface IRequestModel {
  id?: number;
  soldToParty: ISoldToPartyModel;
  documentNumber?: string;
  poDate?: string;
  validFrom: string;
  validTo: string;
  route: IRouteModel;
  material: IMaterialModel;
  meansOfTransPortType?: string;
  receivingPoint?: string;
  shippingType: IShippingTypeModel;
  netWeight: string;
  loadingDateTime: string;
  inquiryNumber?: number;
  orderNumber?: string;
  description?: string;
}
export const RequestModelSchema: yup.SchemaOf<IRequestModel> = yup.object({
  id: yup.number(),
  soldToParty: yup.object({
    value: yup.string().required('مشتری مورد نظر را انتخاب نمایید'),
    label: yup.string().required('مشتری مورد نظر را انتخاب نمایید'),
  }),
<<<<<<< HEAD
  inquiryNumber: yup.number(),
  documentNumber: yup.string(),
  poDate: yup.string(),
=======
  poNumber: yup.string(),
>>>>>>> 59a0e3fc7cdf7d9579a8b419ebad6eb2cf78c492
  validFrom: yup.string().required('تاریخ شروع اعتبار را وارد نمایید'),
  validTo: yup.string().required('تاریخ پایان اعتبار را وارد نمایید'),
  route: yup.object({
    value: yup.string().required('مسیر را انتخاب نمایید'),
    label: yup.string().required('مسیر را انتخاب نمایید'),
  }),
  material: yup.object({
    value: yup.string().required('سرویس را انتخاب نمایید'),
    label: yup.string().required('سرویس را انتخاب نمایید'),
  }),
  meansOfTransPortType: yup.string(),
  receivingPoint: yup.string(),
  shippingType: yup.object({
    value: yup.string().required('نوع حمل را انتخاب نمایید'),
    label: yup.string().required('نوع حمل را انتخاب نمایید'),
  }),
  netWeight: yup.string().required('وزن خالص را وارد نمایید'),
  loadingDateTime: yup.string().required('تاریخ و زمان بارگیری را وارد نمایید'),
  orderNumber: yup.string(),
  description: yup.string(),
});

export interface ISoldToPartyModel {
  value: string;
  label: string;
}
export interface IRouteModel {
  value: string;
  label: string;
}
export interface IMaterialModel {
  value: string;
  label: string;
}
export interface IShippingTypeModel {
  value: string;
  label: string;
}
