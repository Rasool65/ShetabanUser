import { CustomDataTable } from '@src/components/dataTable';
import { ICustomDataTableRef } from '@src/components/dataTable/ICustomDataTableRef';
import { IFetchDataModel } from '@src/components/dataTable/IFetchDataModel';
import { APIURL_GET_SHIPMENT_ORDER } from '@src/configs/apiConfig/apiUrls';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { URL_SHIPMENT_ORDER_DETEAIL } from '@src/configs/urls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { usePersianDate } from '@src/hooks/usePersianDate';
import { IPageListOutputResult } from '@src/models/output/IPageListOutputResult';
import { IShipmentOrderModel } from '@src/models/output/shipment-order/IShipmentOrderModel';
import { forwardRef, FunctionComponent, useEffect, useRef, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { Edit, Eye, Plus, Search, Trash } from 'react-feather';
import { generatePath, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';

export const ShipmentOrderList: FunctionComponent<IPageProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>();
  const [data, setData] = useState<IShipmentOrderModel[]>([]);

  const httpRequest = useHttpRequest();
  const customTableRef = useRef<ICustomDataTableRef>(null);
  const persianDate = usePersianDate();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const fetchData = async (model: IFetchDataModel) => {
    setLoading(true);
    httpRequest
      .getRequest<IPageListOutputResult<IShipmentOrderModel[]>>(APIURL_GET_SHIPMENT_ORDER, () => {}, {
        params: {
          page: model.page,
          limit: model.limit,
          search: search,
        },
      })
      .then((result) => {
        setData(result.data.data);
        setTotalPages(result.data.totalPages);
        setLoading(false);
      });
  };

  const Columns: Array<TableColumn<IShipmentOrderModel>> = [
    {
      name: 'شناسه',
      sortable: true,
      minWidth: '90px',
      maxWidth: '110px',
      selector: (row: IShipmentOrderModel) => row.id,
    },
    {
      name: 'شماره درخواست',
      sortable: true,
      minWidth: '110px',
      maxWidth: '150px',
      selector: (row: IShipmentOrderModel) => row.orderNumber,
    },
    {
      name: 'نوع درخواست',
      sortable: true,
      minWidth: '150px',
      maxWidth: '200px',
      selector: (row: IShipmentOrderModel) => row.shippingType,
    },
    {
      name: 'شماره مشتری',
      sortable: true,
      minWidth: '140px',
      maxWidth: '180px',
      selector: (row: IShipmentOrderModel) => row.customerCode,
    },
    {
      name: 'تاریخ ثبت',
      sortable: true,
      minWidth: '140px',
      maxWidth: '180px',
      selector: (row: IShipmentOrderModel) => persianDate.convertToPersianDate(row.createDate),
    },
    {
      name: '',
      allowOverflow: true,
      minWidth: '100px',
      maxWidth: '110px',
      cell: (row: IShipmentOrderModel) => (
        <>
          <Button
            outline
            size="sm"
            color="default"
            onClick={() => {
              navigate(generatePath(URL_SHIPMENT_ORDER_DETEAIL, { id: row.id.toString() }));
            }}
          >
            <Eye size={18} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">{props.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="mt-1">
            <Col></Col>
            <Col xl={4}>
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="جستجو"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
          </Row>

          <CustomDataTable
            ref={customTableRef}
            columns={Columns}
            data={data}
            loading={loading}
            onFetchData={fetchData}
            totalPages={totalPages}
            searchText={search}
          />
        </CardBody>
      </Card>
    </>
  );
};
