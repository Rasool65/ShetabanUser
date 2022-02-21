import { MouseEventHandler } from 'react';

export interface ICustomButtonProp {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
