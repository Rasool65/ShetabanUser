import { IUserModel } from './../../models/output/authentication/IUserModel';
import { FunctionComponent } from 'react';
// import ProfileAboutPage from './ProfileAboutPage';
import ProfileChangePasswordPage from './ProfileChangePasswordPage';
import { ProfileEdit } from './ProfileEdit';

export interface IProfileProp {
  changePage: Function;
  data?: IUserModel;
  pageIndex: number;
}

export interface IProfilePage {
  title: string;
  component: FunctionComponent<IProfileProp>;
}

export const ProfilePages: IProfilePage[] = [
  {
    title: 'پروفایل',
    component: ProfileEdit,
  },
  {
    title: 'تغییر کلمه عبور',
    component: ProfileChangePasswordPage,
  },
];
