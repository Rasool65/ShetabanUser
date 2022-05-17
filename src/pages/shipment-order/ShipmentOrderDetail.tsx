import Steper from '@src/components/steper';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const ShipmentOrderDetail: FunctionComponent<IPageProps> = (props) => {
  let { id } = useParams();

  return (
    <>
      <Steper />
    </>
  );
};
