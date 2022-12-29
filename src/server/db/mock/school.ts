import { faker } from "@faker-js/faker";

export const school = () => ({
  id: faker.datatype.uuid(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  name: faker.company.name(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  phone: faker.phone.number("###-###-####"),
});
