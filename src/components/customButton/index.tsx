import { FunctionComponent } from 'react';
import { ICustomButtonProp } from './ICustomButtonProp';

const defaultProps: ICustomButtonProp = {
  type: 'submit',
};

export const CustomButton: FunctionComponent<ICustomButtonProp> = (props = defaultProps) => {
  return (
    <>
      {!props.loading ? (
        <button type={props.type} disabled={props.disabled} onClick={props.onClick} className={props.className}>
          {props.children}
        </button>
      ) : (
        <button type="button" disabled className={props.className}>
          <div style={{ width: 24, height: 24 }} className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </button>
      )}
    </>
  );
};
