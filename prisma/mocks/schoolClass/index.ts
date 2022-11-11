import { faker } from '@faker-js/faker';
import { ISchoolClass } from '../../../src/interfaces/ISchoolClass';

export const schoolClass = (): ISchoolClass => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  createdAt: faker.date.past(),
});
