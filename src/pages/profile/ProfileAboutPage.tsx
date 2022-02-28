import { FunctionComponent } from 'react';
import { CardText } from 'reactstrap';
import { IProfileProp } from './IProfileProp';

export const ProfileAboutPage: FunctionComponent<IProfileProp> = (props) => {
  return (
    <>
      <div className="mt-2">
        <h5 className="mb-75">نام:</h5>
        <CardText className="text-primary">{props.data?.profile?.firstName}</CardText>
      </div>
      <div className="mt-2">
        <h5 className="mb-75">نام خانوادگی:</h5>
        <CardText className="text-primary">{props.data?.profile?.lastName}</CardText>
      </div>
      <div className="mt-2">
        <h5 className="mb-75">کد ملی:</h5>
        <CardText className="text-primary">{props.data?.profile?.nationalCode}</CardText>
      </div>
      <div className="mt-2">
        <h5 className="mb-75">پست الکترونیک:</h5>
        <CardText className="text-primary">{props.data?.email}</CardText>
      </div>
    </>
  );
};

export default ProfileAboutPage;
