import * as yup from 'yup';
import { string } from 'yup/lib/locale';

export interface IChatNewModel {
  title: string;
  message: string;
}

export const IChatNewModelSchema: yup.SchemaOf<IChatNewModel> = yup.object({
  title: yup.string().required('لطفا عنوان را وارد نمایید'),
  message: yup.string().required('لطفا متن پیام را وارد نمایید'),
});
