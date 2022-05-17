export interface IShipmentOrderModel {
  id: number;
  customerCode: string;
  documentNumber?: string;
  documentDate?: string;
  validFrom: string;
  validTo: string;
  routeCode: string;
  materialNumber: string;
  meansOfTransportType?: string;
  receivingPoint?: string;
  shippingType: string;
  netWeight: number;
  orderNumber: string;
  description: string;
  inquiryNumber: string;
  createDate: string;
}
