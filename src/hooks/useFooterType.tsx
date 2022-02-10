import { handleFooterType } from '@src/redux/reducers/LayoutReducer';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useFooterType = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);

  const setFooterType = (type: string) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footerType };
};
