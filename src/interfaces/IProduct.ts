export interface IProduct {
  id: string;
  name: string;
  description: string;
  totalPrice: string;
  vatPercentage: string;
  discount?: number;
}
