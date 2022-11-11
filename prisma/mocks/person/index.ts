import { faker } from '@faker-js/faker';
import { Person } from '@prisma/client';
import { IPerson } from '../../../src/interfaces/IPerson';
import { randomIntFromInterval } from '../util';

export const person = (): IPerson => ({
  id: faker.datatype.uuid(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  address: faker.address.street(),
  age: randomIntFromInterval(20, 60),
  phone: faker.phone.number('+45 ########'),
  city: faker.address.cityName(),
  countryCode: faker.address.countryCode(),
  zip: Number(faker.random.numeric(4, { bannedDigits: ['0'] })),
});
