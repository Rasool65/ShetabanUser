import { FunctionComponent } from 'react';
import Permanently from './permanently';
import RetryPermanently from './retryPermanently';
import Temporarily from './temporarily';
import { ITrackCodeProps } from './ITrackCodeProps';

const TrackCode: FunctionComponent<ITrackCodeProps> = (props) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const orderNumber = params.orderNumber;
  const id = params.id;
  const inquiryNumber = params.inquiryNumber;
  return (
    <>
      {inquiryNumber ? (
        <Permanently inquiryNumber={inquiryNumber} />
      ) : orderNumber && id ? (
        <RetryPermanently orderNumber={orderNumber} id={id} />
      ) : (
        <Temporarily orderNumber={orderNumber} />
      )}
    </>
  );
};

export default TrackCode;
