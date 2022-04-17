import { FunctionComponent } from 'react';
import { Card, CardBody } from 'reactstrap';
import { ITrackCodeProps } from './ITrackCodeProps';

const Temporarily: FunctionComponent<ITrackCodeProps> = ({ orderNumber }) => {
  return (
    <>
      <Card>
        <CardBody title="ثبت موقت">
          <div style={{ textAlign: 'center' }}>
            <div>
              <img height={250} src={require('../../assets/images/shetaban/trackCode.svg')} alt="TrackCodeSvg" />
            </div>
            <div style={{ marginRight: '20px' }}>
              <p>درخواست ثبت موقت شما با موفقیت انجام شد.</p>
            </div>
            <div style={{ marginRight: '20px' }}>
              <i>کد پیگیری : </i>
              <i>{orderNumber}</i>
            </div>
            <br />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Temporarily;
