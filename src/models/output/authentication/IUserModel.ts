import { IUserProfileModel } from './IUserProfileModel';
export interface IUserModel {
  mobile: string;
  email?: string;
  userRole: UserRoleType;
  profile?: IUserProfileModel;
}

export enum UserRoleType {
  user = 0,
  admin = 1,
}
