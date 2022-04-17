import { IAuthResultModel } from './IAuthResultModel';
import { IUserModel } from './IUserModel';
export interface ILoginResultModel {
  auth: IAuthResultModel;
  user: IUserModel;
}
