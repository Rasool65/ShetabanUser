import { FunctionComponent } from 'react';
import { Label } from 'reactstrap';
import { ICustomFormGroupProp } from './ICustomFormGroupProp';

export const CustomFormGroup: FunctionComponent<ICustomFormGroupProp> = (props) => {
  return (
    <>
      <div className={'form-group col-sm-' + props.col}>
        {props.label ? (
          <>
            <Label>{props.label}</Label>
          </>
        ) : (
          <></>
        )}
        {props.children}
      </div>
    </>
  );
};
