export const LAYOUT_CHANGE_LANGUAGE = 'LAYOUT_CHANGE_LANGUAGE';

export interface ChangeLayoutLanguageActionType {
  type: typeof LAYOUT_CHANGE_LANGUAGE;
  payload: string;
}

export type LayoutDispatchTypes = ChangeLayoutLanguageActionType;
