import { LayoutDispatchTypes, LAYOUT_CHANGE_LANGUAGE } from '../actions/layout/LayoutActionTypes';
import { ILayoutReducerState } from '../states/ILayoutReducerState';

const defultlayoutReducerState: ILayoutReducerState = {
  language: 'fa',
};

export const layoutReducer = (state: ILayoutReducerState = defultlayoutReducerState, action: LayoutDispatchTypes) => {
  switch (action.type) {
    case LAYOUT_CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
