import { FunctionComponent, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { ITrackCodeProps } from './ITrackCodeProps';

const Permanently: FunctionComponent<ITrackCodeProps> = (props) => {
  return (
    <>
      <Card>
        <CardBody title="ثبت قطعی">
          <div style={{ textAlign: 'center' }}>
            <div>
              <img height={250} src={require('../../assets/images/shetaban/trackCode.svg')} alt="TrackCodeSvg" />
            </div>
            <div style={{ marginRight: '20px' }}>
              <p>درخواست ثبت قطعی شما با موفقیت انجام شد.</p>
            </div>
            <br />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Permanently;
