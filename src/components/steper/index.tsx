import { FunctionComponent } from 'react';

import 'bs-stepper/dist/css/bs-stepper.min.css';
import './style.css';
import { CheckSquare, Edit, File, FileText, Loader } from 'react-feather';
import Check from '@src/assets/images/shipment-order-icons/Check.svg';

export const Steper: FunctionComponent = () => {
  return (
    <>
      <div className="bs-stepper">
        <div className="bs-stepper-header" role="tablist">
          <div className="step" data-target="#logins-part">
            <button type="button" className="step-trigger" role="tab" aria-controls="logins-part" id="logins-part-trigger">
              <span className="bs-stepper-icon">
                <Edit />
              </span>
              <span className="bs-stepper-circle">
                <img src={Check} />
              </span>
              <span className="bs-stepper-label">درخواست اولیه</span>
            </button>
          </div>
          <div className="line active"></div>
          <div className="step active" data-target="#information-part">
            <button
              type="button"
              className="step-trigger"
              role="tab"
              aria-controls="information-part"
              id="information-part-trigger"
            >
              <span className="bs-stepper-icon">
                <File />
              </span>
              <span className="bs-stepper-circle">
                <Loader size={17} />
              </span>
              <span className="bs-stepper-label">پیش فاکتور</span>
            </button>
          </div>
          <div className="line"></div>
          <div className="step not-set" data-target="#information-part">
            <button
              type="button"
              className="step-trigger"
              role="tab"
              aria-controls="information-part"
              id="information-part-trigger"
            >
              <span className="bs-stepper-icon">
                <FileText />
              </span>
              <span className="bs-stepper-circle"></span>
              <span className="bs-stepper-label">ثبت سفارش</span>
            </button>
          </div>
          <div className="line"></div>
          <div className="step not-set" data-target="#information-part">
            <button
              type="button"
              className="step-trigger"
              role="tab"
              aria-controls="information-part"
              id="information-part-trigger"
            >
              <span className="bs-stepper-icon">
                <CheckSquare />
              </span>
              <span className="bs-stepper-circle"></span>
              <span className="bs-stepper-label">فاکتور نهایی</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Steper;
