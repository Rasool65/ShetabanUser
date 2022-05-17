import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap';
import classnames from 'classnames';
import AsyncSelect from 'react-select/async';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { useSelector } from 'react-redux';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import {
  APIURL_CREATE_PERMANENT_REQUEST,
  APIURL_CREATE_REQUEST,
  APIURL_GET_CUSTOMERS,
  APIURL_GET_MATERIALS,
  APIURL_GET_ROUTES,
  APIURL_GET_SHIPPINGS,
} from '@src/configs/apiConfig/apiUrls';
import { RootStateType } from '@src/redux/Store';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRequestModel, RequestModelSchema } from '@src/models/input/request/IRequestModel';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { CustomerModel } from '@src/models/output/requisition/CustomerModel';
import { ShippingModel } from '@src/models/output/requisition/ShippingModel';
import { MaterialModel } from '@src/models/output/requisition/MaterialModel';
import { RouteModel } from '@src/models/output/requisition/RouteModel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useNavigate } from 'react-router-dom';
import { URL_TRACK_CODE } from '@src/configs/urls';

const Request: FunctionComponent<IPageProps> = (props) => {
  const store = useSelector((state: RootStateType) => state.layout);
  const { skin } = store;
  const [submitType, setSubmitType] = useState<boolean>(false);
  let CustomerSelectData: any[] = [];
  let ShippingSelectData: any[] = [];
  let MaterialSelectData: any[] = [];
  let RouteSelectData: any[] = [];
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>();
  const darkStyle = {
    height: 'calc(2.4em + 0.75rem - 6px)',
    width: '100%',
    backgroundColor: '#283046',
    color: '#b4b7bd',
    borderColor: '#404656',
  };
  const lighStyle = {
    height: 'calc(2.4em + 0.75rem - 6px)',
    width: '100%',
  };

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestModel>({ mode: 'onChange', resolver: yupResolver(RequestModelSchema) });

  const onSubmit = (data: IRequestModel) => {
    if (data && !isLoading) {
      setIsLoading(true);
      const body = {
        customerCode: data.soldToParty.value,
        documentNumber: data.documentNumber,
        documentDate: data.poDate,
        validFrom: data.validFrom,
        validTo: data.validTo,
        routeCode: data.route.value,
        materialNumber: data.material.value,
        meansOfTransPortType: data.meansOfTransPortType,
        receivingPoint: data.receivingPoint,
        shippingTypeCode: data.shippingType.value,
        netWeight: data.netWeight,
        description: data.description,
        loadingDateTime: data.loadingDateTime,
      };
      !submitType
        ? httpRequest
            .postRequest<IOutputResult<IRequestModel>>(APIURL_CREATE_PERMANENT_REQUEST, body)
            .then((result) => {
              result.data.data.inquiryNumber
                ? navigate(URL_TRACK_CODE + '?inquiryNumber=' + result.data.data.inquiryNumber)
                : navigate(URL_TRACK_CODE + '?id=' + result.data.data.id + '&orderNumber=' + result.data.data.orderNumber);
            })
            .finally(() => setIsLoading(false))
        : httpRequest
            .postRequest<IOutputResult<IRequestModel>>(APIURL_CREATE_REQUEST, body)
            .then((result) => {
              navigate(URL_TRACK_CODE + '?orderNumber=' + result.data.data.orderNumber);
            })
            .finally(() => setIsLoading(false));
    }
  };
  // const authenticationStore = useSelector((state: RootStateType) => state.authentication);
  // + '&id=' + result.data.data.id
  const httpRequest = useHttpRequest();

  const filterCustomerListData = (inputValue: string) => {
    return CustomerSelectData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };
  const filterShippingListData = (inputValue: string) => {
    return ShippingSelectData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };
  const filterMaterialListData = (inputValue: string) => {
    return MaterialSelectData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };
  const filterRouteListData = (inputValue: string) => {
    return RouteSelectData.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  useEffect(() => {
    skin === 'dark' ? setDarkMode(true) : setDarkMode(false);
  }, [store]);

  const CustomerListData = (data: CustomerModel[]) => {
    CustomerSelectData = [];
    data.forEach((d) => {
      CustomerSelectData.push({ value: d.customerCode, label: d.portalDesc });
    });
  };
  const CustomerOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (CustomerSelectData.length > 0) {
        resolve(filterCustomerListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<CustomerModel[]>>(APIURL_GET_CUSTOMERS).then((result) => {
          if (result.data) {
            CustomerListData(result.data.data);
            resolve(filterCustomerListData(inputValue));
          }
        });
      }
    });
  };
  const ShippingListData = (data: ShippingModel[]) => {
    ShippingSelectData = [];
    data.forEach((d) => {
      ShippingSelectData.push({ value: d.shippingTypeCode, label: d.portalDesc });
    });
  };
  const ShippingOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (ShippingSelectData.length > 0) {
        resolve(filterShippingListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<ShippingModel[]>>(APIURL_GET_SHIPPINGS).then((result) => {
          if (result.data) {
            ShippingListData(result.data.data);
            resolve(filterShippingListData(inputValue));
          }
        });
      }
    });
  };
  const MaterialListData = (data: MaterialModel[]) => {
    MaterialSelectData = [];
    data.forEach((d) => {
      MaterialSelectData.push({ value: d.materialNumber, label: d.portalDesc });
    });
  };
  const MaterialOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (MaterialSelectData.length > 0) {
        resolve(filterMaterialListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<MaterialModel[]>>(`${APIURL_GET_MATERIALS}?Page=1&Limit=10`).then((result) => {
          if (result.data) {
            MaterialListData(result.data.data);
            resolve(filterMaterialListData(inputValue));
          }
        });
      }
    });
  };
  const RouteListData = (data: RouteModel[]) => {
    RouteSelectData = [];
    data.forEach((d) => {
      RouteSelectData.push({ value: d.routeCode, label: d.portalDesc });
    });
  };
  const RouteOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (RouteSelectData.length > 0) {
        resolve(filterRouteListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<RouteModel[]>>(`${APIURL_GET_ROUTES}?Page=1&Limit=10`).then((result) => {
          if (result.data) {
            RouteListData(result.data.data);
            resolve(filterRouteListData(inputValue));
          }
        });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card className="card-request">
        <CardHeader className="card-header">
          <CardTitle tag="h4">اطلاعات پایه</CardTitle>
        </CardHeader>
        <hr />
        <CardBody className="cardbody-request">
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> مشتری
              </Label>
              <Controller
                name="soldToParty"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      placeholder="انتخاب مشتری"
                      isClearable
                      defaultOptions
                      className={classnames('react-select', {
                        'is-invalid': errors.soldToParty?.value?.message || errors.soldToParty,
                      })}
                      noOptionsMessage={() => 'لیست خالی است'}
                      classNamePrefix="select"
                      loadOptions={CustomerOption}
                      cacheOptions
                      {...field}
                    />
                    <FormFeedback className="d-block">
                      {errors.soldToParty?.value?.message || (errors.soldToParty && 'مشتری مورد نظر را انتخاب نمایید')}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">شماره درخواست خرید مشتری</Label>
              <Controller
                name="documentNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="input-request"
                      type="text"
                      invalid={errors.documentNumber && true}
                      placeholder="شماره درخواست خرید مشتری را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Row>
                <Col md="6" className="request-date">
                  <Label className="form-label">تاریخ درخواست خرید </Label>
                  <Controller
                    name="poDate"
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                      <div>
                        <DatePicker
                          render={<InputIcon style={darkMode ? darkStyle : lighStyle} />}
                          weekDays={weekDays}
                          className={darkMode ? 'green custom-calendar' : 'green'}
                          inputClass="form-control"
                          onChange={(date: any) => {
                            const selectedDate = date.toDate();
                            onChange(selectedDate.toISOString());
                          }}
                          value={value}
                          format="YYYY/MM/DD"
                          calendar={persian}
                          locale={persian_fa}
                          calendarPosition="bottom-right"
                        />
                      </div>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="card-request">
        <CardHeader className="card-header">
          <CardTitle tag="h4">تاریخ اعتبار</CardTitle>
        </CardHeader>
        <hr />
        <CardBody className="cardbody-request">
          <Col lg="4" md="6" sm="12">
            <Row className="mb-1">
              <Col md="6" className="from-date">
                <Label className="form-label">
                  <span style={{ color: 'red' }}>*</span> تاریخ شروع
                </Label>{' '}
                <Controller
                  name="validFrom"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <div>
                      <DatePicker
                        render={<InputIcon style={darkMode ? darkStyle : lighStyle} />}
                        weekDays={weekDays}
                        className={darkMode ? 'green custom-calendar' : 'green'}
                        inputClass={classnames('form-control react-select', {
                          'is-invalid': errors.validFrom?.message,
                        })}
                        onChange={(date: any) => {
                          const selectedDate = date.toDate();
                          onChange(selectedDate.toISOString());
                        }}
                        value={value}
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      <FormFeedback className="d-block">{errors.validFrom?.message}</FormFeedback>
                    </div>
                  )}
                />
              </Col>
              <Col md="6" className="from-date">
                <Label className="form-label">
                  <span style={{ color: 'red' }}>*</span> تاریخ پایان
                </Label>{' '}
                <Controller
                  name="validTo"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <div>
                      <DatePicker
                        render={<InputIcon style={darkMode ? darkStyle : lighStyle} />}
                        weekDays={weekDays}
                        className={darkMode ? 'green custom-calendar' : 'green'}
                        inputClass={classnames('form-control react-select', {
                          'is-invalid': errors.validTo?.message,
                        })}
                        onChange={(date: any) => {
                          const selectedDate = date.toDate();
                          onChange(selectedDate.toISOString());
                        }}
                        value={value}
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      <FormFeedback className="d-block">{errors.validTo?.message}</FormFeedback>
                    </div>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </CardBody>
      </Card>
      <Card className="card-request">
        <CardHeader className="card-header">
          <CardTitle tag="h4">مشخصات سرویس</CardTitle>
        </CardHeader>
        <hr />
        <CardBody className="cardbody-request">
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> مسیر
              </Label>{' '}
              <Controller
                name="route"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      placeholder="انتخاب مسیر"
                      {...field}
                      isClearable
                      defaultOptions
                      classNamePrefix="select"
                      loadOptions={RouteOption}
                      className={classnames('react-select', {
                        'is-invalid': errors.route?.value?.message || errors.route,
                      })}
                      noOptionsMessage={() => 'لیست خالی است'}
                      cacheOptions
                    />
                    <FormFeedback className="d-block">
                      {errors.route?.value?.message || (errors.route && 'نوع مسیر را انتخاب کنید')}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> سرویس
              </Label>{' '}
              <Controller
                name="material"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      placeholder="انتخاب سرویس"
                      {...field}
                      isClearable
                      defaultOptions
                      classNamePrefix="select"
                      loadOptions={MaterialOption}
                      cacheOptions
                      className={classnames('react-select', {
                        'is-invalid': errors.material?.value?.message || errors.material,
                      })}
                      noOptionsMessage={() => 'لیست خالی است'}
                    />
                    <FormFeedback className="d-block">
                      {errors.material?.value?.message || (errors.material && 'نوع سرویس را انتخاب نمایید')}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> نوع حمل
              </Label>{' '}
              <Controller
                name="shippingType"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      placeholder="انتخاب نوع حمل"
                      {...field}
                      isClearable
                      defaultOptions
                      className={classnames('react-select', {
                        'is-invalid': errors.shippingType?.value?.message || errors.shippingType,
                      })}
                      classNamePrefix="select"
                      loadOptions={ShippingOption}
                      noOptionsMessage={() => 'لیست خالی است'}
                      cacheOptions
                    />
                    <FormFeedback className="d-block">
                      {errors.shippingType?.value?.message || (errors.shippingType && 'نوع حمل را انتخاب نمایید')}
                    </FormFeedback>
                  </>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="card-request">
        <CardHeader className="card-header">
          <CardTitle tag="h4">اطلاعات بارگیری</CardTitle>
        </CardHeader>
        <hr />
        <CardBody className="cardbody-request">
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">نوع وسیله حمل و نقل</Label>
              <Controller
                name="meansOfTransPortType"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="input-request"
                      type="text"
                      invalid={errors.meansOfTransPortType && true}
                      placeholder="نوع وسیله حمل و نقل را انتخاب نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
            <Col lg="3" md="6" sm="12" className="mb-1" style={{ display: 'grid' }}>
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> تاریخ و زمان بارگیری
              </Label>{' '}
              <Controller
                name="loadingDateTime"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <div>
                    <DatePicker
                      render={<InputIcon style={darkMode ? darkStyle : lighStyle} />}
                      weekDays={weekDays}
                      className={darkMode ? 'green custom-calendar' : 'green'}
                      inputClass={classnames('form-control react-select', {
                        'is-invalid': errors.loadingDateTime?.message,
                      })}
                      onChange={(date: any) => {
                        const selectedDate = date.toDate();
                        onChange(selectedDate.toISOString());
                      }}
                      value={value}
                      format="HH:mm:ss YYYY/MM/DD"
                      plugins={[<TimePicker position="bottom" />]}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                    />
                    <FormFeedback className="d-block">{errors.loadingDateTime?.message}</FormFeedback>
                  </div>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-1">
              <Label className="form-label">محل بارگیری</Label>
              <Controller
                name="receivingPoint"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="input-request"
                      type="text"
                      invalid={errors.receivingPoint && true}
                      placeholder="محل بارگیری را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
            <Col lg="3" md="6" sm="12" className="mb-1">
              <Label className="form-label">
                <span style={{ color: 'red' }}>*</span> وزن (کیلوگرم)
              </Label>
              <Controller
                name="netWeight"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="input-request"
                      type="number"
                      invalid={errors.netWeight && true}
                      placeholder="وزن بار را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                    <FormFeedback className="d-block">{errors.netWeight?.message}</FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="3" md="6" sm="12" className="mb-1">
              <Label className="form-label">توضیحات </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="input-request"
                      invalid={errors.description && true}
                      placeholder="توضیحات را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                    {/* <FormFeedback className="d-block">{errors.netWeight?.message}</FormFeedback> */}
                  </>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="card-request">
        <CardHeader className="card-header">
          <CardTitle tag="h4">وضعیت ثبت</CardTitle>
        </CardHeader>
        <hr />
        <CardBody className="cardbody-request">
          <Row>
            <div className="form-check form-check-inline" style={{ paddingRight: '15px', marginBottom: '5px' }}>
              <Input
                type="checkbox"
                defaultChecked={submitType}
                id="basic-cb-checked"
                onChange={() => {
                  setSubmitType(!submitType);
                }}
                style={{ marginRight: '0' }}
              />
              <Label for="basic-cb-checked" className="form-check-label" style={{ marginRight: '5px' }}>
                انجام ثبت به صورت موقت
              </Label>
            </div>
          </Row>
        </CardBody>
      </Card>

      <Button disabled={isLoading} style={{ marginBottom: '50px' }} type="submit" color="primary">
        {isLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'ثبت درخواست'}
      </Button>
    </Form>
  );
};
export default Request;
