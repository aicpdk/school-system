import { faker } from '@faker-js/faker';

export const user = (username: string = 'admin', password: string = 'Test!123') => ({
  id: faker.datatype.uuid(),
  password: password,
  username: username,
  isVerified: false,
});
