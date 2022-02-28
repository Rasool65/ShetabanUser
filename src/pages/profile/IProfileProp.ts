import { IUserModel } from './../../models/output/authentication/IUserModel';
import { FunctionComponent } from 'react';
import ProfileAboutPage from './ProfileAboutPage';
import ProfileChangePasswordPage from './ProfileChangePasswordPage';

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
    title: 'درباره من',
    component: ProfileAboutPage,
  },
  {
    title: 'تغییر کلمه عبور',
    component: ProfileChangePasswordPage,
  },
];
