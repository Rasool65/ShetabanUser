import { Dispatch } from 'redux';
import { LayoutDispatchTypes, LAYOUT_CHANGE_LANGUAGE } from './LayoutActionTypes';

export const ChangeLayoutLanguage = (language: string) => async (dispatch: Dispatch<LayoutDispatchTypes>) => {
  dispatch({
    type: LAYOUT_CHANGE_LANGUAGE,
    payload: language,
  });
};
