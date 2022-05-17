import { APIURL_RETRY_PERMANENT_REQUEST } from '@src/configs/apiConfig/apiUrls';
import { URL_TRACK_CODE } from '@src/configs/urls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useToast } from '@src/hooks/useToast';
import { IRequestModel } from '@src/models/input/request/IRequestModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import { ITrackCodeProps } from './ITrackCodeProps';

const RetryPermanently: FunctionComponent<ITrackCodeProps> = ({ orderNumber, id }) => {
  const { postRequest } = useHttpRequest();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const toast = useToast();

  const retry = (id?: number) => {
    setIsLoading(true);
    postRequest<IOutputResult<IRequestModel>>(APIURL_RETRY_PERMANENT_REQUEST, { id })
      .then((result) => {
        result.data.data.inquiryNumber
          ? navigate(URL_TRACK_CODE + '?inquiryNumber=' + result.data.data.inquiryNumber)
          : toast.showWarning(' ثبت قطعی انجام نشد مجددأ تلاش کنید');
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Card>
        <CardBody title="درخواست مجدد">
          <div style={{ textAlign: 'center' }}>
            <div>
              <img height={250} src={require('../../assets/images/shetaban/trackCode.svg')} alt="TrackCodeSvg" />
            </div>
            <div style={{ marginRight: '20px' }}>
              <p> درخواست ثبت قطعی شما با مشکل مواجه شد اما ثبت موقت شما با موفقیت انجام شده است</p>
            </div>
            <div style={{ marginRight: '20px' }}>
              <i>کد پیگیری ثبت موقت : </i>
              <i>{orderNumber}</i>
            </div>
            <br />
            <Button
              disabled={isLoading}
              style={{ marginBottom: '50px' }}
              onClick={() => {
                id ? retry(parseInt(id)) : '';
              }}
              color="primary"
            >
              {isLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'تلاش مجدد ثبت قطعی'}
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default RetryPermanently;
