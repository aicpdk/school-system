import { RoleType } from '@prisma/client';

export interface IPerson {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  age: number;
  phone: string;
  city: string;
  countryCode: string;
  zip: number;
}

export interface IPersonWithRoles extends IPerson {
  roles: RoleType[];
}
