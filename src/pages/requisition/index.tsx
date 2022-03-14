import BreadCrumbs from '@src/components/breadcrumbs';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { useDispatch, useSelector } from 'react-redux';
import {
  APIURL_CREATE_REQUEST,
  APIURL_GET_CUSTOMERS,
  APIURL_GET_MATERIALS,
  APIURL_GET_ROUTES,
  APIURL_GET_SHIPPINGS,
  APIURL_LOGIN,
} from '@src/configs/apiConfig/apiUrls';
import { RootStateType } from '@src/redux/Store';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRequestModel, RequestModelSchema } from '@src/models/input/request/IRequestModel';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { CustomerModel } from '@src/models/output/requisition/CustomerModel';
import { ShippingModel } from '@src/models/output/requisition/ShippingModel';
import { MaterialModel } from '@src/models/output/requisition/MaterialModel';
import { RouteModel } from '@src/models/output/requisition/RouteModel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

const Request: FunctionComponent<IPageProps> = (props) => {
  let CustomerSelectData: any[] = [];
  let ShippingSelectData: any[] = [];
  let MaterialSelectData: any[] = [];
  let RouteSelectData: any[] = [];

  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedShipping, setSelectedShipping] = useState<string>('');

  const [poDate, setPoDate] = useState<any>(new Date());
  const [validFrom, setValidFrom] = useState<any>(new Date());
  const [validTo, setValidTo] = useState<any>(new Date());
  const [loadingDateTime, setLoadingDateTime] = useState<any>(new Date());

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestModel>({ mode: 'onChange', resolver: yupResolver(RequestModelSchema) });

  const onSubmit = (data: IRequestModel) => {
    debugger;
    (data.poDate = poDate), (data.validFrom = validFrom), (data.validTo = validTo), (data.loadingDateTime = '');
    if (data && !isLoading) {
      setIsLoading(true);

      httpRequest
        .postRequest<IOutputResult<IRequestModel>>(APIURL_CREATE_REQUEST, { data })
        .then((result) => {})
        .finally(() => setIsLoading(false));
    }
  };
  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

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

  //   useEffect(() => {
  //     document.title = currentPage.title;
  //   }, [currentPage.title]);

  const CustomerListData = (data: CustomerModel[]) => {
    CustomerSelectData = [];
    data.forEach((d) => {
      CustomerSelectData.push({ value: d.customerCode, label: d.customerName });
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
      ShippingSelectData.push({ value: d.shippingTypeCode, label: d.description });
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
      MaterialSelectData.push({ value: d.materialNumber, label: d.description });
    });
  };
  const MaterialOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (MaterialSelectData.length > 0) {
        resolve(filterMaterialListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<MaterialModel[]>>(APIURL_GET_MATERIALS).then((result) => {
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
      RouteSelectData.push({ value: d.routeCode, label: d.description });
    });
  };
  const RouteOption = (inputValue: string) => {
    return new Promise((resolve) => {
      if (RouteSelectData.length > 0) {
        resolve(filterRouteListData(inputValue));
      } else {
        httpRequest.getRequest<IOutputResult<RouteModel[]>>(APIURL_GET_ROUTES).then((result) => {
          if (result.data) {
            RouteListData(result.data.data);
            resolve(filterRouteListData(inputValue));
          }
        });
      }
    });
  };
  const selectCustomer = (e: any) => {
    debugger;
    var selectedValue = e.value;
    if (selectedValue) {
      setSelectedCustomer(selectedValue);
    }
  };
  const selectRoute = (e: any) => {
    var selectedValue = e.value;
    if (selectedValue) {
      setSelectedRoute(selectedValue);
    }
  };
  const selectMaterial = (e: any) => {
    var selectedValue = e.value;
    if (selectedValue) {
      setSelectedMaterial(selectedValue);
    }
  };
  const selectShipping = (e: any) => {
    var selectedValue = e.value;
    if (selectedValue) {
      setSelectedShipping(selectedValue);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">اطلاعات پایه</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Row>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">انتخاب مشتری</Label>
              <Controller
                name="soldToParty"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      isClearable
                      defaultOptions
                      className="react-select"
                      classNamePrefix="select"
                      loadOptions={CustomerOption}
                      cacheOptions
                      // onInputChange={selectCustomer}
                      {...field}
                    />
                    <div style={{ color: 'red' }}>{errors.soldToParty?.value?.message}</div>
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1"></Col>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">شماره سند فروش داخلی</Label>
              <Controller
                name="poNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      invalid={errors.poNumber && true}
                      placeholder="شماره سند فروش داخلی را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1" style={{ display: 'grid' }}>
              <Label className="form-label">تاریخ سند فروش داخلی</Label>
              <DatePicker
                inputClass="form-control"
                value={poDate}
                onChange={setPoDate}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
              {poDate?.toDate?.().toString()}
              {/* <Controller
                name="poDate"
                rules={{ required: true }}
                control={control}
                render={({
                  field: { onChange, name, value },

                  formState: { errors }, //optional, but necessary if you want to show an error message
                }) => (
                  <>
                    <DatePicker
                      value={value || ''}
                      onChange={(date: any) => {
                        onChange(date?.isValid ? date : '');
                      }}
                      // format={language === "fa" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                    />
                    <div>{errors.poDate?.message}</div>
                    {errors && errors[name] && errors[name]?.type === 'required' && (
                      //if you want to show an error message
                      <span>your error message !</span>
                    )}
                  </>
                )}
              /> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">تاریخ اعتبار</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Col lg="7" md="6" sm="12">
            <Row className="mb-1">
              <Col>
                <Label className="form-label">تاریخ شروع</Label>
                <DatePicker
                  style={{ marginRight: '1rem' }}
                  inputClass="form-control"
                  value={validFrom}
                  onChange={setValidFrom}
                  calendar={persian}
                  locale={persian_fa}
                />
              </Col>
              <Col>
                <Label className="form-label">تاریخ پایان</Label>
                <DatePicker
                  style={{ marginRight: '1rem' }}
                  inputClass="form-control"
                  value={validTo}
                  onChange={setValidTo}
                  calendar={persian}
                  locale={persian_fa}
                />
              </Col>
            </Row>
          </Col>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">مشخصات سرویس</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Row>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">مسیر</Label>
              <Controller
                name="route"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      {...field}
                      isClearable
                      defaultOptions
                      className="react-select"
                      classNamePrefix="select"
                      loadOptions={RouteOption}
                      cacheOptions
                      onInputChange={selectRoute}
                    />
                    <FormFeedback>{errors.route?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">سرویس</Label>
              <Controller
                name="material"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      {...field}
                      isClearable
                      defaultOptions
                      className="react-select"
                      classNamePrefix="select"
                      loadOptions={MaterialOption}
                      cacheOptions
                      onInputChange={selectMaterial}
                    />
                    <FormFeedback>{errors.material?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">نوع حمل</Label>
              <Controller
                name="shippingType"
                control={control}
                render={({ field }) => (
                  <>
                    <AsyncSelect
                      {...field}
                      isClearable
                      defaultOptions
                      className="react-select"
                      classNamePrefix="select"
                      loadOptions={ShippingOption}
                      cacheOptions
                      onInputChange={selectShipping}
                    />
                    <FormFeedback>{errors.shippingType?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">اطلاعات بارگیری</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Row>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">نوع وسیله حمل و نقل</Label>
              <Controller
                name="meansOfTransPortType"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      invalid={errors.meansOfTransPortType && true}
                      placeholder="نوع وسیله حمل و نقل را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1" style={{ display: 'grid' }}>
              <Label className="form-label">تاریخ و زمان بارگیری</Label>
              <Controller
                name="loadingDateTime"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      inputClass="form-control"
                      onChange={setLoadingDateTime}
                      value={loadingDateTime}
                      format="MM/DD/YYYY HH:mm:ss"
                      plugins={[<TimePicker position="bottom" />]}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                    />
                    {/* <FormFeedback>{errors.loadingDateTime?.message}</FormFeedback> */}
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">وزن</Label>
              <Controller
                name="netWeight"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="number"
                      invalid={errors.netWeight && true}
                      placeholder="وزن بار را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                    <FormFeedback>{errors.netWeight?.message}</FormFeedback>
                  </>
                )}
              />
            </Col>
            <Col lg="6" md="6" sm="12" className="mb-1">
              <Label className="form-label">محل بارگیری</Label>
              <Controller
                name="recevingPoint"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      invalid={errors.recevingPoint && true}
                      placeholder="محل بارگیری را وارد نمایید"
                      autoComplete="off"
                      {...field}
                    />
                  </>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Button disabled={isLoading} style={{ marginBottom: '100px' }} type="submit" color="primary" block>
        {isLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'ثبت موقت درخواست'}
      </Button>
    </Form>
  );
};
export default Request;
