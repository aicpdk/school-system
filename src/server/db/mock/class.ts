import { faker } from "@faker-js/faker";

export const _class = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    createdAt: faker.date.past(),
  };
};
