export interface IUserProfileModel {
  firstName: string;
  lastName: string;
  nationalCode?: string;
  userGender: number;
  avatar?: string;
}
export interface IChangePasswordModel {
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
}

