import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

export interface IProfileUpdateModel {
  email?: string;
  isAvatarRemoved?: boolean;
  profile: IProfileModel;
}

export const ProfileUpdateModelSchema: yup.SchemaOf<IProfileUpdateModel> = yup.object({
  isAvatarRemoved: yup.boolean(),
  email: yup.string().email('لطفا یک ایمیل معتبر وارد نمایید'),
  profile: yup.object({
    firstName: yup.string().required('لطفا نام را وارد نمایید'),
    lastName: yup.string().required('لطفا نام خانوادگی را وارد نمایید'),
    nationalCode: yup.string().notRequired(),
    userGender: yup.number(),
  }),
});

export interface IProfileModel {
  firstName: string;
  lastName: string;
  nationalCode?: string;
  userGender?: number;
}
