import { faker } from "@faker-js/faker";
import type { RepeatFrequency } from "@prisma/client";

const frequences: RepeatFrequency[] = [
  "DAILY",
  "MONTHLY",
  "WEEKLY",
  "YEARLY",
  "NONE",
];

export const event = () => {
  const startDate = faker.date.past();
  const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 2);
  const frequence =
    frequences[faker.datatype.number({ min: 0, max: frequences.length - 1 })];

  return {
    id: faker.datatype.uuid(),
    allDay: faker.datatype.boolean(),
    startTime: startDate,
    endTime: endDate,
    createdAt: faker.date.past(),
    repeat: frequence || "NONE",
    description: faker.lorem.paragraph(),
    title: faker.company.catchPhrase(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
  };
};
