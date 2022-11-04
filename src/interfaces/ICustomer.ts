interface ICarProperty {
  regNumber: string;
  brand?: string;
  model?: string;
  year?: string;
}

interface IProperties {
  car: ICarProperty[];
}

export interface ICustomer {
  id: string;
  name: string;
  properties: IProperties;
}
