import { FunctionComponent } from 'react';
import LoginCheckConfirmCode from './LoginCheckConfirmCode';
import LoginGetMobile from './LoginGetMobile';
import LoginGetPassword from './LoginGetPassword';

export interface ILoginProp {
  changePage: Function;
  mobile?: string;
  pageIndex: number;
  remainingTimeSeconds?: number;
}

export interface ILoginPage {
  title: string;
  component: FunctionComponent<ILoginProp>;
}

export const LoginPages: ILoginPage[] = [
  {
    title: 'ورود به حساب کاربری',
    component: LoginGetMobile,
  },
  {
    title: 'رمز عبور را وارد نمایید',
    component: LoginGetPassword,
  },
  {
    title: 'کد ارسال شده به شماره زیر را وارد نمایید',
    component: LoginCheckConfirmCode,
  },
];
