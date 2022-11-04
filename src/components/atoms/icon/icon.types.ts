export enum IconEnum {
  Search = 'search',
  Invoice = 'invoice',
  Customer = 'customer',
  Department = 'department',
  Employee = 'employee',
  Dashboard = 'dashboard',
}

export interface IIconProps {
  color: string;
  size?: number;
  name: IconEnum;
}
