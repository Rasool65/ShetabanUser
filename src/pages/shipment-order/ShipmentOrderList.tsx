import { CustomDataTable } from '@src/components/dataTable';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { forwardRef, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Edit, Plus, Search, Trash } from 'react-feather';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
export const ShipmentOrderList: FunctionComponent<IPageProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

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

          {/* <CustomDataTable
            ref={customTableRef}
            columns={MaterialCategoryColumns}
            data={data}
            loading={loading}
            onFetchData={fetchData}
            totalPages={totalPages}
            searchText={search}
          /> */}
        </CardBody>
      </Card>
    </>
  );
};
