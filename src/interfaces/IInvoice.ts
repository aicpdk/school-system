import { ICustomer } from './ICustomer';

export interface IInvoice {
  id: string;
  invoiceId: string;
  carReg: string;
  products: string[];
  customer: ICustomer;
  createdAt: number;
}
