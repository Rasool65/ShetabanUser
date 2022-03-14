import * as yup from 'yup';

export interface IRequestModel {
  soldToParty: ISoldToPartyModel;
  poNumber?: string;
  poDate?: string;
  validFrom: string;
  validTo: string;
  route: IRouteModel;
  material: IMaterialModel;
  meansOfTransPortType?: string;
  recevingPoint?: string;
  shippingType: IShippingTypeModel;
  netWeight: string;
  loadingDateTime: string;
}
export const RequestModelSchema: yup.SchemaOf<IRequestModel> = yup.object({
  soldToParty: yup.object({
    value: yup.string().required('مشتری مورد نظر را انتخاب نمایید'),
    label: yup.string().required('مشتری مورد نظر را انتخاب نمایید'),
  }),
  poNumber: yup.string(),
  poDate: yup.string(),
  validFrom: yup.string().required('تاریخ شروع اعتبار را وارد نمایید'),
  validTo: yup.string().required('تاریخ پایان اعتبار را وارد نمایید'),
  route: yup.object({
    value: yup.string().required('نوع مسیر را وارد نمایید'),
    label: yup.string().required('نوع مسیر را وارد نمایید'),
  }),
  material: yup.object({
    value: yup.string().required('نوع سرویس را وارد نمایید'),
    label: yup.string().required('نوع سرویس را وارد نمایید'),
  }),
  meansOfTransPortType: yup.string(),
  recevingPoint: yup.string(),
  shippingType: yup.object({
    value: yup.string().required('نوع حمل را وارد نمایید'),
    label: yup.string().required('نوع حمل را وارد نمایید'),
  }),
  netWeight: yup.string().required('وزن خالص را وارد نمایید'),
  loadingDateTime: yup.string().required('تاریخ و زمان بارگیری را وارد نمایید'),
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
