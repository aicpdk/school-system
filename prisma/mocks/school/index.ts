import { faker } from '@faker-js/faker';
import { ISchool } from '../../../src/interfaces/ISchool';

export const school = (): ISchool => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.department(),
  adress: faker.address.streetAddress(),
  city: faker.address.cityName(),
  zip: Number(faker.random.numeric(4, { bannedDigits: ['0'] })),
  countryCode: faker.address.countryCode(),
});
